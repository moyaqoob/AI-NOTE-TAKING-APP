"use client"

import {motion} from "framer-motion"

type TextProps={
    text:string
}

const TextAnimator = ({text}:TextProps)=>{
    const letter = text.split('');

    return(
        <div className="flex overflow-hidden">
            {letter.map((char,index)=>(
                <motion.span
                key={index}
                    initial={{opacity:0,y:-10}}
                    animate={{opacity:1,x:1}}
                    transition={{delay:index*0.1,duration:0.5}}
                    className="inline-block text-4xl font-semibold p-[4px] tracking-tighter text-transparent bg-gradient-to-b from-[#ff7a18] to-[#e540b1] bg-clip-text"
                >
                    {char === " "? "\u00A0":char}

                </motion.span>
            ))}
        </div>
    )
}

export default TextAnimator