import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const ServiceCard = ({ item, index }) => {
    const { name, desc } = item;

    // Define a more vibrant color array for the number circles
    const colorArray = [
        '#0afad2', 
        '#1E90FF', 
        '#FFD700', 
        '#8cc9f5', 
        '#f58cad'  
    ];

    return (
        <div className="py-[30px] px-3 lg:px-5">
            <h2 className="text-[26px] leading-9 text-headingColor font-[700]">
                {name}
            </h2>
            <p className="text-[16px] leading-7 font-[400] text-textColor mt-5">
                {desc}
            </p>
            <div className="flex items-center justify-between mt-[30px]">
                <Link to="/doctors" className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E]  flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                    <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>

                
                <span
                    className="w-[44px] h-[44px] flex items-center justify-center text-[18px] leading-[30px] font-[600]"
                    style={{
                        background: colorArray[index % colorArray.length], // Cycle through colors
                        color: '#fff', // White text color
                        borderRadius: '50%', // Fully rounded circle
                    }}
                >
                    {index + 1}  {/* Display the index number */}
                </span>
            </div>
        </div>
    );
};

export default ServiceCard;
