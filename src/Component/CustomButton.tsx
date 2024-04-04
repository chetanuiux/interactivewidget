import React from 'react'

interface CustomButtonProps {
  selected?: boolean;
  onClick?: () => void;
  children:string
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, selected, onClick }) => {
    // const classes=useStyles()
  return (
    <span className="bg-orange-500 py-4 px-6 rounded-md cursor-pointer" 
    onClick={onClick}
    >{children}</span>
    
  )
}

export default CustomButton