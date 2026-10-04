"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

interface ScrollExperienceProps {
  image: string; alt: string; eyebrow: string; title: string;
  description: string; href: string; linkText: string;
}
export function ScrollExperience(props: ScrollExperienceProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, .55, 1], [.91, 1, 1.04]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const radius = useTransform(scrollYProgress, [0, .55], [36, 12]);
  return <section ref={ref} className="studio-story"><div className="studio-story-sticky">
    <motion.div className="studio-story-frame" style={reduced ? undefined : { scale, borderRadius: radius }}>
      <motion.div className="studio-story-image" style={reduced ? undefined : { scale: imageScale }}><Image src={props.image} alt={props.alt} fill sizes="(max-width: 768px) 100vw, 92vw" /></motion.div>
      <div className="studio-story-shade" />
      <div className="studio-story-copy"><p className="studio-eyebrow">{props.eyebrow}</p><h2>{props.title}</h2><p>{props.description}</p><Link className="studio-button studio-button-light" href={props.href}>{props.linkText}<span aria-hidden="true">↗</span></Link></div>
    </motion.div>
  </div></section>;
}
