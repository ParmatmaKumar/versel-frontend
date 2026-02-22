import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI";
import IconBtn from "../../../../common/IconBtn";
import { FaCloudUploadAlt } from "react-icons/fa";
import RequirementField from "./RequirementField"
import toast from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { setCourse, setStep } from "../../../../../slices/courseSlice";

const CourseInformationForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();

    const {token} = useSelector((state) => state.auth)

    const { course, editCourse } = useSelector((state) => state.course);

    const [loading, setLoading] = useState(false);

    const [courseCategories, setCourseCategories] = useState([]);

    const [thumbnailPreview, setThumbnailPreview] = useState(null);

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            if (categories?.length > 0) {
                setCourseCategories(categories);
            }

            setLoading(false);
        };

        if (editCourse && course) {
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category?._id);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.thumbnail);
        }

        if (editCourse && course?.thumbnail) {
            setThumbnailPreview(course.thumbnail);
        }


        getCategories();
    }, [editCourse, course, setValue]);

    const isFormUpload = () => {
        const currentValues = getValues();
        if (currentValues.courseTitle != course.courseName ||
            currentValues.courseShortDesc != course.courseDescription ||
            currentValues.coursePrice != course.price ||
            currentValues.courseTags != course.tag.toString() ||
            currentValues.courseBenefits != course.whatYouWillLearn ||
            currentValues.courseCategory != course.category._id ||
            currentValues.courseImage != course.thumbnail ||
            currentValues.courseRequirements.toString() != course.instructions.toString())
            return true;

        else
            return false;
    }

    const onSubmit = async (data) => {

        if (editCourse) {
            if (isFormUpload()) {
                const currentValues = getValues();
                const formData = new FormData();

                formData.append("courseId", course._id);
                if (currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle);
                }

                if (currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc);
                }

                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice);
                }

                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits);
                }

                if (currentValues.courseCategory !== course.category._id) {
                    formData.append("category", data.courseCategory);
                }

                if (currentValues.courseTags !== course.tag?.toString()) {
                    formData.append("tag", data.courseTags);
                }

                if (currentValues.courseImage?.length > 0) {
                    formData.append("thumbnail", data.courseImage[0]);
                }

                if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
                    formData.append("instructions", JSON.stringify(data.courseRequirements));
                }
                
                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);
                if (result) {
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }

            }
            else{
                toast.error("No change made so far");
            }
            return;

        }
        // create a new course
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("tag", data.courseTags);
        formData.append("thumbnail", data.courseImage[0]);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("status", COURSE_STATUS.DRAFT);

        setLoading(true);
        const result = await addCourseDetails ( formData,token);
        if (result){
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        setLoading(false);
        console.log("Printting formData",formData)
        console.log("Result",result)
        console.log("token",token)

    }



    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-md bg-gray-900 border border-gray-600 p-6 space-y-6 text-white"
            >
                {/* Course Title */}
                <div>
                    <label>Course Title</label>
                    <input
                        type="text"
                        placeholder="Enter Course Title"
                        className="w-full mt-1 p-2 rounded bg-gray-800"
                        {...register("courseTitle", { required: true })}
                    />
                    {errors.courseTitle && (
                        <span className="text-red-400">Course Title is required</span>
                    )}
                </div>

                {/* Course Description */}
                <div>
                    <label>Course Short Description</label>
                    <textarea
                        placeholder="Enter Description"
                        className="w-full min-h-10 mt-1 p-2 rounded bg-gray-800 "
                        {...register("courseShortDesc", { required: true })}
                    />
                    {errors.courseShortDesc && (
                        <span className="text-red-400">Description is required</span>
                    )}
                </div>

                {/* Price */}
                <div>
                    <label>Price</label>
                    <input
                        type="number"
                        placeholder="Enter Price"
                        className="w-full mt-1 p-2 rounded bg-gray-800"
                        {...register("coursePrice", { required: true, valueAsNumber: true })}
                    />
                    {errors.coursePrice && (
                        <span className="text-red-400">Price is required</span>
                    )}
                </div>

                {/* Category */}
                <div>
                    <label>Category</label>
                    <select
                        className="w-full mt-1 p-2 rounded bg-gray-800"
                        {...register("courseCategory", { required: true })}
                    >
                        <option value="">Select Category</option>
                        {courseCategories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.courseCategory && (
                        <span className="text-red-400">Category is required</span>
                    )}
                </div>

                {/* Tags */}
                <div>
                    <label>Tags</label>
                    <input
                        type="text"
                        placeholder="Enter tags (comma separated)"
                        className="w-full mt-1 p-2 rounded bg-gray-800"
                        {...register("courseTags", { required: true })}
                    />
                    {errors.courseTags && (
                        <span className="text-red-400">Tags are required</span>
                    )}
                </div>

                {/* Thumbnail */}
                <div>
                    <label className="text-sm text-gray-300">
                        Course Thumbnail <sup className="text-red-400">*</sup>
                    </label>

                    <div className="mt-2">
                        <label
                            htmlFor="courseImage"
                            className="flex flex-col items-center justify-center
                                h-[234px] w-[617px] cursor-pointer rounded-md border-2 border-dashed border-blue-400 bg-gray-800 text-gray-400 hover:border-blue-300 transition"
                        >
                            {thumbnailPreview ? (
                                <img
                                    src={thumbnailPreview}
                                    alt="Thumbnail Preview"
                                    className="h-full w-full object-cover rounded-md"
                                />
                            ) : (
                                <>
                                    <div className="flex flex-col items-center gap-2">
                                        <FaCloudUploadAlt className="text-4xl text-yellow-400" />
                                        <p className="text-sm">
                                            Drag and drop an image, or{" "}
                                            <span className="text-yellow-400 underline">Browse</span>
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Max 6MB each (12MB for videos)
                                        </p>
                                    </div>

                                    <div className="mt-4 flex gap-6 text-xs text-gray-500">
                                        <span>Aspect ratio 16:9</span>
                                        <span>Recommended size 1024x576</span>
                                    </div>
                                </>
                            )}
                        </label>

                        <input
                            id="courseImage"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            {...register("courseImage", {
                                required: !editCourse,
                                onChange: (e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setThumbnailPreview(URL.createObjectURL(file));
                                    }
                                },
                            })}
                        />

                        {errors.courseImage && (
                            <span className="text-red-400 text-sm mt-1 block">
                                Course thumbnail is required
                            </span>
                        )}
                    </div>
                </div>


                {/* Benefits */}
                <div>
                    <label>Benefits of the course</label>
                    <textarea
                        placeholder="Enter course benefits"
                        className="w-full min-h-50 mt-1 p-2 rounded bg-gray-800"
                        {...register("courseBenefits", { required: true })}
                    />
                    {errors.courseBenefits && (
                        <span className="text-red-400">Benefits are required</span>
                    )}
                </div>

                {/* Requirements */}

                <RequirementField
                    name="courseRequirements"
                    label="Requirements / Instructions"
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    getValue={getValues}

                />

                <div className="flex justify-between">
                    {
                        editCourse && (
                            <button
                                type="button"
                                onClick={() => dispatch(setStep(2))}
                                className="text-gray-100 bg-gray-600 p-2 rounded-md">
                                Continue without Saving
                            </button>
                        )
                    }
                    <IconBtn type="submit" text={!editCourse ? "Next" : "Save Changes"} />
                </div>

            </form>
        </>
    );
};

export default CourseInformationForm;
