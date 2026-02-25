'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { StudioProject, ArtPiece } from '@/lib/content';

type FolderItem = StudioProject | ArtPiece;

interface ProjectFolderProps {
  item: FolderItem;
  layoutId: string;
  onOpen: () => void;
  isOpen: boolean;
  meta?: string;
}

function getImage(item: FolderItem): string {
  if ('coverImage' in item) return item.coverImage;
  return item.image;
}

export default function ProjectFolder({ item, layoutId, onOpen, isOpen, meta }: ProjectFolderProps) {
  return (
    <motion.div
      className="cursor-pointer group"
      style={{ opacity: isOpen ? 0 : 1, pointerEvents: isOpen ? 'none' : 'auto' }}
      onClick={onOpen}
      whileHover="hover"
      initial="rest"
    >
      {/* Stacked papers visual */}
      <div className="relative" style={{ paddingBottom: '10px', paddingRight: '10px' }}>
        {/* Back page 2 */}
        <motion.div
          className="absolute inset-0"
          style={{
            top: '10px',
            left: '10px',
            right: '-10px',
            bottom: '-10px',
            backgroundColor: '#ccc9c2',
            zIndex: 0,
          }}
          variants={{
            rest: { rotate: 0, x: 0, y: 0 },
            hover: { rotate: 3.5, x: 6, y: -4 },
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        />

        {/* Back page 1 */}
        <motion.div
          className="absolute inset-0"
          style={{
            top: '5px',
            left: '5px',
            right: '-5px',
            bottom: '-5px',
            backgroundColor: '#dedbd5',
            zIndex: 1,
          }}
          variants={{
            rest: { rotate: 0, x: 0, y: 0 },
            hover: { rotate: -2, x: -3, y: 2 },
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        />

        {/* Front page — project image */}
        <motion.div
          layoutId={layoutId}
          className="relative z-10 overflow-hidden"
          style={{ aspectRatio: '4/5', backgroundColor: '#e0ddd8' }}
        >
          <Image
            src={getImage(item)}
            alt={item.title}
            fill
            className="object-cover"
            onError={() => {}}
          />
          {/* Gradient overlay with meta */}
          <div
            className="absolute inset-0 flex items-end p-3"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.42) 0%, transparent 55%)' }}
          >
            <span className="font-mono text-[10px] text-white/70 uppercase tracking-wider">
              {meta}
            </span>
          </div>

          {/* Hover reveal: subtle "open" indicator */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
            transition={{ duration: 0.2 }}
            style={{ backgroundColor: 'rgba(0,0,0,0.18)' }}
          >
            <span
              className="font-mono text-white uppercase"
              style={{ fontSize: '0.6rem', letterSpacing: '0.22em' }}
            >
              Open →
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Title below folder — date/meta removed, only title */}
      <div className="mt-3 pr-2">
        <h3
          className="font-bold text-sm leading-tight"
          style={{ color: '#0a0a0a', letterSpacing: '-0.01em' }}
        >
          {item.title}
        </h3>
      </div>
    </motion.div>
  );
}
