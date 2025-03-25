import React from 'react'

const CategoryForm = ({handleSubmit,value,setValue}) => {

  return (
    <>
    <div className="  ">
      <h2 className="text-xl font-semibold mt-4">manage the category</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="mb-4 ">
          <label className="block text-gray-700 ">Name:</label>
          <input
            type="text"
            name="name"
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            className="px-3 py-2 border rounded-lg w-96 "
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className=" w-20 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
    </>
  )
}

export default CategoryForm