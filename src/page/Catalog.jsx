import React, { useEffect, useState } from 'react'
import Footer from "../components/common/Footer"
import { useParams } from 'react-router-dom'
import { categories } from '../services/apis';
import { apiConnector } from '../services/apiconnector';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Course_Card from '../components/core/Catalog/Course_Card';
 
 export const Catalog = () => {

    const {catalogName} = useParams();
    const [catalogPageData,setCatalogPageData] = useState(null);
    const [categoryId,setCategoryId] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // fetch all category
    useEffect(()=>{
        const getCategories = async()=>{
            try {
                const res = await apiConnector("GET",categories.CATEGORIES_API);
                const filteredCategory = res?.data?.data?.filter((ct)=>ct.name.split(" ").join("-").toLowerCase() === catalogName)[0];
                if(filteredCategory){
                    setCategoryId(filteredCategory._id);
                } else {
                    setError("Category not found");
                    setLoading(false);
                }
            } catch(error) {
                console.log("Error fetching categories:", error);
                setError("Failed to load categories");
                setLoading(false);
            }
        }
        getCategories();
    },[catalogName]);


    useEffect(()=>{
        const getCategoryDetails = async()=>{
            if(!categoryId) return;
            setLoading(true);
            setError(null);
            try{
                const res = await getCatalogPageData(categoryId);

                console.log("Catalog Page Data Response:", res);
                console.log("Selected Category Courses:", res?.data?.selectedCategory?.courses);
                console.log("Most Selling Courses:", res?.data?.mostSellingCourse);
                
                if(res?.success === false) {
                    setError(res?.message || "Failed to load category data");
                } else {
                    setCatalogPageData(res);
                }
            }catch(error){
                console.log("error",error);
                setError(error?.response?.data?.message || error?.message || "Failed to load category details");
            } finally {
                setLoading(false);
            }
        }
        getCategoryDetails();
    },[categoryId])




   if(loading) {
       return (
           <div className='text-white flex items-center justify-center min-h-screen'>
               <p>Loading...</p>
           </div>
       )
   }

   if(error) {
       return (
           <div className='text-white flex items-center justify-center min-h-screen'>
               <p className='text-red-400'>{error}</p>
           </div>
       )
   }

   if(!catalogPageData?.data) {
       return (
           <div className='text-white flex items-center justify-center min-h-screen'>
               <p>No data available</p>
           </div>
       )
   }

  return (
  <div className="bg-gray-950 text-gray-100 min-h-screen">
    
    {/* Hero / Breadcrumb Section */}
    <div className="bg-gray-900 border-b border-gray-800">
      <div className="w-11/12 max-w-7xl mx-auto py-12">
        
        {/* Breadcrumb */}
        <p className="text-sm text-gray-400">
          Home / Catalog /{" "}
          <span className="text-yellow-400 font-medium">
            {catalogPageData?.data?.selectedCategory?.name}
          </span>
        </p>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mt-4 text-white">
          {catalogPageData?.data?.selectedCategory?.name}
        </h1>

        {/* Description */}
        <p className="text-gray-400 mt-4 max-w-3xl leading-relaxed">
          {catalogPageData?.data?.selectedCategory?.description}
        </p>
      </div>
    </div>

    {/* Content Section */}
    <div className="w-11/12 max-w-7xl mx-auto py-12 space-y-16">

      {/* Section 1 - Most Popular */}
      {catalogPageData?.data?.selectedCategory?.courses?.length > 0 && (
        <div>
          <div className="flex gap-6 border-b border-gray-800 pb-3 mb-6">
            <p className="text-lg font-semibold text-yellow-400 cursor-pointer">
              Most Popular
            </p>
            <p className="text-lg font-medium text-gray-400 cursor-pointer hover:text-white transition-all duration-200">
              New
            </p>
          </div>

          <CourseSlider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      )}

      {/* Section 2 - Top Courses */}
      {catalogPageData?.data?.selectedCategory?.courses?.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-white">
            Top Courses in{" "}
            <span className="text-yellow-400">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </h2>

          <CourseSlider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      )}

      {/* Section 3 - Frequently Bought Together */}
      {catalogPageData?.data?.mostSellingCourse?.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-8 text-white">
            Frequently Bought Together
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {catalogPageData?.data?.mostSellingCourse
              ?.slice(0, 4)
              .map((course, index) => (
                <Course_Card
                  course={course}
                  key={index}
                  height="h-[380px]"
                />
              ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {(!catalogPageData?.data?.selectedCategory?.courses?.length &&
        !catalogPageData?.data?.mostSellingCourse?.length) && (
        <div className="py-12 text-center">
          <p className="text-gray-500 text-lg">
            No courses available in this category yet.
          </p>
        </div>
      )}

    </div>

    <Footer />
  </div>
)

 }
 