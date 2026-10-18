export interface ChapbookPage {
  pageNumber: number;
  pdfPage?: number;
  type: 'cover' | 'copyright' | 'author' | 'contents' | 'poem' | 'buy';
  title?: string;
  number?: string;
  subtitle?: string;
  content?: string[];
  note?: string;
  buyUrl?: string;
}

export const BUY_URL = "https://selar.com/9170387n98";

export const CHEMTRAILS_PAGES: ChapbookPage[] = [
  {
    pageNumber: 1,
    type: 'cover',
    title: 'chemtrails & constellations',
    subtitle: 'A CHAPBOOK OF POEMS',
    content: ['taiwo akinyemi']
  },
  {
    pageNumber: 2,
    type: 'copyright',
    title: 'COPYRIGHT NOTICE',
    subtitle: 'chemtrails & constellations',
    content: [
      'Copyright © 2026 Taiwo Akinyemi. All rights reserved.',
      'No part of this book may be reproduced, distributed, stored in a retrieval system, or transmitted in any form or by any means, including photocopying, recording, scanning, or any electronic or mechanical method, without the prior written permission of the author, except for brief quotations used in reviews, criticism, or other non-commercial uses permitted by applicable copyright law.',
      'The poems, writings, illustrations, concepts, and original creative works contained in this book are the intellectual property of the author and may not be reproduced, adapted, republished, or distributed without permission.',
      'For permission requests, collaborations, or other inquiries, please contact the author through his official platforms.'
    ]
  },
  {
    pageNumber: 3,
    type: 'author',
    title: 'About the Author',
    content: [
      'Taiwo Akinyemi is a Nigerian poet and writer. His poems have appeared in Isele, Praxis, The African Magazine, Kalahari Review, and other literary publications.',
      'His writing explores love, memory, solitude, wonder, and the peculiarities of being human. He writes under the name haegis.',
      'Chemtrails & Constellations is his first chapbook.'
    ]
  },
  {
    pageNumber: 4,
    type: 'contents',
    title: 'Contents',
    content: [
      'what we own (Preview)',
      'chemtrails and constellations (Preview)',
      'stalking daydreams (Preview)',
      'secrets and whispers. (Locked)',
      'time stumbles (Locked)',
      'the ghost of what never was (Locked)',
      'the falling vulture of lyra (Locked)',
      'cinematic week (Locked)',
      'is my heart breaking?! (Locked)',
      'dejavu is a luxury (Locked)',
      'the price of peace (Locked)',
      'fire (Locked)',
      'how i became a poet (Locked)',
      'go away, i want to be with fireboy (Locked)',
      'breaking in gerunds (Locked)',
      'nice to write again (Locked)',
      'on earth angels are penguins (Locked)',
      'adulthood (Locked)'
    ]
  },
  {
    pageNumber: 5,
    pdfPage: 2,
    number: '♡ 01',
    type: 'poem',
    title: 'what we own',
    content: [
      'the drily february night\ncrawling out of sight,',
      'you roamed the streets\nrunning out of rhymes.',
      'it lingers in your reach\n&concealed deep within',
      'you walked the long road to\ntry and find your fire.',
      'scribbler sharpening pens\npoets catching fires',
      'we forgot how to love but\nhey boy do we try',
      '&for all i really know\nyou\'re all i truly own',
      'this is the part of me that\nwill never leave.'
    ]
  },
  {
    pageNumber: 6,
    pdfPage: 3,
    number: '♡ 02',
    type: 'poem',
    title: 'chemtrails and constellations',
    content: [
      'take out polaris\nyour trail leads\nme home',
      'the ghost i sought\nlives in your\nshadow',
      'painting the night sky\nmy moon is libra\nmy virgo is sun',
      'meet up for stargazing\ni love who i am when\ni am with you',
      'high up like stars and\nairplanes. chemtrails\nand constellations.'
    ]
  },
  {
    pageNumber: 7,
    pdfPage: 4,
    number: '♡ 03',
    type: 'poem',
    title: 'stalking daydreams',
    content: [
      'staring at a blank screen\ntugging at a heartstring\ndreaming up a face',
      'stalking through a daydream\ntime traveling with perfumes\nreaching for a name',
      'drowning in a shy smile\nthinking oh my God\nthis is what i live for.'
    ]
  },
  {
    pageNumber: 8,
    type: 'buy',
    title: 'Complete Edition',
    subtitle: '18 Poems on Love, Memory, Solitude, and Wonder',
    buyUrl: BUY_URL,
    content: [
      'You have reached the end of the 7-page preview.',
      'To read all 18 poems in the collection—including "secrets and whispers.", "time stumbles", "fire", "how i became a poet", "on earth angels are penguins", and "adulthood"—acquire the full chapbook.',
      'Available now via the official Selar release link below.'
    ]
  }
];
