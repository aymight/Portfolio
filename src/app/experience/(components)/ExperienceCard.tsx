"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { getPicUrl } from '@/app/utils'
import { motion } from 'framer-motion'

const item_variants = {
    init: {
        x: "-40%",
        opacity: 0
    },
    ani: {
        x: "0%",
        opacity: 1,
        transition: {
            duration: 1
        }
    }
}

const small_v = {
    init: {
        y: "-40%",
        opacity: 0
    },
    ani: {
        y: "0%",
        opacity: 0.6,
        transition: {
            duration: 1
        }
    }
}

export interface Role {
    icon?: string | null,
    title: string,
    start: string,
    role: string,
    end: string
}

export default function ExperienceCard(exp: Role) {
    const [iconUrl, setIcon] = useState<any>(null)

    useEffect(() => {
        getPicUrl("EXPERIENCE/" + exp.icon).then((d) => setIcon(d as any))
    }, [exp])

    return (
        <motion.div
            variants={item_variants}
            className="experience-card"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
            }}
        >
            {iconUrl && (
                <Image
                    src={iconUrl}
                    alt="Places I worked in or studied in"
                    width={80} // Fixed width
                    height={80} // Fixed height
                    style={{
                        borderRadius: "25%", // Rounded corners
                        objectFit: "cover", // Ensures image fits within bounds
                    }}
                />
            )}
            <p className='title' style={{ fontWeight: "600" }}>{exp.role}</p>
            <p className='p-light' style={{ fontWeight: "500" }}>{exp.title}</p>
            <motion.p
                variants={small_v}
                className='p-light p-tiny'
                style={{ fontWeight: "500", fontStyle: "italic" }}
            >
                {exp.start}{exp.end && (" -- " + exp.end)}
            </motion.p>
        </motion.div>
    )
}
