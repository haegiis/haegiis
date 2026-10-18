import exhi1 from '../assets/images/exhi1.mp4';
import exhi2 from '../assets/images/exhi2.jpeg';
import exhi3 from '../assets/images/exhi3.jpg';
import exhi4 from '../assets/images/exhi4.png';
import exhi5 from '../assets/images/exhi5.png';
import exhi6 from '../assets/images/exhi6.png';

export interface ArchiveArtwork {
  id: string;
  src: string;
  mediaType?: 'image' | 'video';
  title?: string;
  year?: string;
  caption?: string;
  orientation?: 'portrait' | 'landscape' | 'square';
  frameStyle?: 'matte-black' | 'natural-walnut' | 'brushed-silver';
  medium?: string;
}

/**
 * ============================================================================
 * VIRTUAL ARCHIVE — Photography & Moving Image Collection by haegis
 * ============================================================================
 */
export const ARCHIVE_ARTWORKS: ArchiveArtwork[] = [
  {
    id: "exhi-1",
    src: exhi1,
    mediaType: "video",
    title: "Archive Study 01 (Moving Image)",
    year: "2024",
    caption: "Motion and memory. Time caught between stillness and flight.",
    orientation: "portrait",
    frameStyle: "matte-black",
    medium: "Moving image installation"
  },
  {
    id: "exhi-2",
    src: exhi2,
    mediaType: "image",
    title: "Archive Study 02",
    year: "2024",
    caption: "Quiet geometry and available light.",
    orientation: "portrait",
    frameStyle: "natural-walnut",
    medium: "Archival photography"
  },
  {
    id: "exhi-3",
    src: exhi3,
    mediaType: "image",
    title: "Archive Study 03",
    year: "2024",
    caption: "Traces left behind in the afternoon stillness.",
    orientation: "portrait",
    frameStyle: "matte-black",
    medium: "Archival photography"
  },
  {
    id: "exhi-4",
    src: exhi4,
    mediaType: "image",
    title: "Archive Study 04",
    year: "2024",
    caption: "Reflections in monochrome.",
    orientation: "portrait",
    frameStyle: "brushed-silver",
    medium: "Silver gelatin print"
  },
  {
    id: "exhi-5",
    src: exhi5,
    mediaType: "image",
    title: "Archive Study 05",
    year: "2024",
    caption: "The quiet weight of what remains.",
    orientation: "portrait",
    frameStyle: "natural-walnut",
    medium: "Archival pigment print"
  },
  {
    id: "exhi-6",
    src: exhi6,
    mediaType: "image",
    title: "Archive Study 06",
    year: "2024",
    caption: "A fragment from the personal journal.",
    orientation: "portrait",
    frameStyle: "matte-black",
    medium: "Archival pigment print"
  }
];
