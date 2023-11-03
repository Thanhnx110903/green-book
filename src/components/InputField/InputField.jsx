import React from 'react'

const InputField = ({ value, setValue, nameKey, type, invalidField, setInvalidFields }) => {
  return (
    <div className='mt-2'>
      <input
        // id='email'
        // name='email'
        type={type || 'text'}
        placeholder={nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)}
        value={value}
        onChange={(e) => setValue(prev => ({ ...prev, [nameKey]: e.target.value }))}
        className='placeholder:text-2xl pl-[16px] Hoặc đăng nhập bằnglock w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-[40px] lg:text-xl'
      />
    </div>
  )
}

export default InputField
