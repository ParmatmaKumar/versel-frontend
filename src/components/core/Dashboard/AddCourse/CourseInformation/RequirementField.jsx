import React, { useEffect, useState } from 'react'

const RequirementField = ({ name, label, register, errors, setValue, getValues }) => {

    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);
    const handleAddRequirement = () => {
        if (requirement) {
            setRequirementList([...requirementList, requirement]);
            // setRequirement("");
        }
    }

    const handleRemoveRequirement = (index) => {
        const updateRequirementList = [...requirementList];
        updateRequirementList.slice(index, 1);
        setRequirementList(updateRequirementList);
    }

    useEffect(()=>{
        register(name,{
            required:true,
            validate:(value) => value.length > 0
        })
    },[])

    useEffect(()=>{
        setValue(name,requirementList);
    },[requirementList])

    return (

        <div>
            <div>
                <label>{label}<sub>*</sub></label>
                 <input type="text"
                 id={name}
                 value={requirement} 
                 onChange={(e)=>setRequirement(e.target.value)}
                 placeholder='Enter Benefits of the course'
                 className='w-full mt-1 p-2 rounded bg-gray-800'/>

                 <button type="button"
                 onClick={handleAddRequirement}
                 className='font-semibold text-yellow-400 my-3 '>
                    ADD
                 </button>
            </div>
            {
                requirementList.length > 0 && (
                    <ul>
                        {
                            requirementList.map((requirement,index)=>(
                                <li key={index} className='flex items-center gap-10'>
                                    <span>{requirement}</span>
                                    <button className='text-xs text-gray-900 font-semibold rounded-md bg-yellow-300 mt-2 p-2 '
                                    onClick={() => handleRemoveRequirement(index)}>Clear</button>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
            {
                errors[name] && (
                    <span>{label} is required</span>
                )
            }
        </div>
    )
}

export default RequirementField