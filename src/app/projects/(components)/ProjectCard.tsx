"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import "./projectcad.css"
import Link from 'next/link'
import { getPicUrl } from '@/app/utils'
import { Timestamp } from 'firebase/firestore'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export interface Project {
    id: string,
    url: string,
    reference?: string,
    titre: string,
    categorie: string,
    content?: string,
    description: string,
    longDescription?: string,
    labels: string[],
    projectDate: Timestamp,
    lastUpdateDate: Timestamp,
    type: "big" | "small"
}

export default function ProjectCard(project : Project) {
    const router = useRouter()
    const [iconUrl, setIconUrl] = useState<string | null>(null)

    useEffect(() => {
        if (project.url)
            getPicUrl("PROJECTS/" + project.url).then((d) => setIconUrl(d as string))
    }, [project])

    return (
        <div className="project-card" onClick={() => router.push(`/projects/${project.id}`, { scroll: true })}>
            <Link href={`/projects/${project.id}`} >
                <div
                    className="image-container"
                    style={{
                        width: project.type === "small" ? 600 : 1000,
                        height: 450,
                        overflow: "hidden"
                    }}
                >
                    {iconUrl && (
                        <Image
                            sizes="100vw"
                            src={iconUrl}
                            fill
                            alt="Projects I realised or collaborated at"
                            style={{ borderRadius: "20px" }} // Apply border radius here
                        />
                    )}
                </div>
            </Link>
            <h5>
                <Link href={`/projects/${project.id}`}>{project.titre}</Link>
            </h5>
            <motion.p
                initial={{ y: "60%", opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: "0%", transition: { duration: 0.3, delay: 0.1 }}}
                className="p-light"
            >
                {project.description}
            </motion.p>
        </div>
    )
}
