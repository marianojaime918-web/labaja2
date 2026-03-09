import { prisma } from '../lib/prisma'

async function main() {
  // 1. Golf Field (TPC Danzante Bay)
  const danzante = await prisma.golfField.upsert({
    where: { id: 'tpc-danzante-bay' },
    update: {
      name: 'TPC Danzante Bay',
      description: 'An 18-hole masterpiece showcasing the paradisiacal views of Loreto Bay. Designed by Rees Jones, this brilliant and multi-themed course takes you through valleys, arroyos, dunes, and foothills.',
      imageUrl: 'https://images.unsplash.com/photo-1593111774240-d529f12db460?q=80&w=2070&auto=format&fit=crop',
      pricePerPlayer: 454.75,
      maxPlayers: 4,
    },
    create: {
      id: 'tpc-danzante-bay',
      name: 'TPC Danzante Bay',
      description: 'An 18-hole masterpiece showcasing the paradisiacal views of Loreto Bay. Designed by Rees Jones, this brilliant and multi-themed course takes you through valleys, arroyos, dunes, and foothills.',
      pricePerPlayer: 454.75,
      maxPlayers: 4,
      imageUrl: 'https://images.unsplash.com/photo-1593111774240-d529f12db460?q=80&w=2070&auto=format&fit=crop',
      availabilities: {
        create: [0, 1, 2, 3, 4, 5, 6].map((day) => ({
          dayOfWeek: day,
          startTime: '07:30',
          endTime: '17:30',
          intervalMinutes: 15,
        })),
      },
    },
  })

  // 2. Page Content Seeds

  // Home Page
  const homeContent = JSON.stringify({
    heroTitle: 'WELCOME TO TPC DANZANTE BAY',
    heroSubtitle: 'Play where the pros play',
    heroImage: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070&auto=format&fit=crop',
    introTitle: 'AN 18-HOLE MASTERPIECE SHOWCASING THE PARADISIACAL VIEWS OF LORETO BAY.',
    introText1: 'In a dazzling world-class location stretching along the east coast of the Baja California peninsula, near the magical town of Loreto, Mexico; Rees Jones has designed TPC Danzante Bay, a brilliant and multi-themed 18-hole golf course that takes you through valleys, arroyos, dunes, and foothills.',
    introText2: 'The majestic Loreto golf course features spectacular landscapes showcasing the natural beauty of the region. From every angle, the breathtaking views of the Islands of Loreto and the Sierra de la Giganta mountain range will take your breath away.',
    experienceTitle: 'EXPERIENCE TPC DANZANTE BAY',
    experienceSubtitle: 'A different challenge for everyone',
    experienceText: 'The par-72 golf course in Loreto offers a different challenge for golfers of all abilities, providing a diversity of holes on the beach, cliffs, and canyons. The 17th hole has already gained fame as one of the most beautiful holes in the game.',
    experienceImage: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2070&auto=format&fit=crop'
  })

  await prisma.pageContent.upsert({
    where: { slug: 'home' },
    update: {
      title: 'Home Page',
      content: homeContent
    },
    create: {
      slug: 'home',
      title: 'Home Page',
      content: homeContent
    }
  })

  // Golf Club Page (renamed from club-de-golf)
  const clubContent = JSON.stringify({
    heroTitle: 'GOLF CLUB',
    heroSubtitle: 'A unique experience designed by Rees Jones',
    heroImage: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2070&auto=format&fit=crop',
    designerTitle: 'WORLD CLASS DESIGN',
    designerText1: 'TPC Danzante Bay is a brilliant, multi-themed 18-hole masterpiece designed by legendary architect Rees Jones. The course takes you on a diverse journey through valleys, arroyos, dunes and foothills, offering spectacular views on every shot.',
    designerText2: 'Each hole presents a unique challenge and incomparable beauty, integrating perfectly with the natural surroundings of the Sierra de la Giganta and the Sea of Cortez.',
    designerImage: 'https://images.unsplash.com/photo-1592919505780-30395071e867?q=80&w=1974&auto=format&fit=crop',
    detailsTitle: 'COURSE DETAILS',
    grassType: 'Paspalum SeaDwarf throughout the course, ensuring superior playing conditions and sustainability.',
    facilities: 'Full Pro Shop, practice area, 9-hole putting course and clubhouse with restaurant.',
    signatureHole: 'The 17th hole, a spectacular par 3 situated on a cliff overlooking the Sea of Cortez.'
  })

  // We upsert 'golf-club'
  await prisma.pageContent.upsert({
    where: { slug: 'golf-club' },
    update: {
      title: 'Golf Club',
      content: clubContent
    },
    create: {
      slug: 'golf-club',
      title: 'Golf Club',
      content: clubContent
    }
  })

  // Location Page (renamed from como-llegar)
  const locationContent = JSON.stringify({
    heroTitle: 'GETTING HERE',
    heroSubtitle: 'Your journey to the ultimate golf experience',
    heroImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1788&auto=format&fit=crop',
    locationTitle: 'PRIVILEGED LOCATION',
    locationText: 'TPC Danzante Bay is located on the east coast of the Baja California Peninsula, just minutes from the charming Magic Town of Loreto. This destination offers a perfect blend of natural beauty and accessibility.',
    flightsInfo: 'Loreto International Airport (LTO) receives direct flights from Los Angeles (LAX), San Francisco (SFO), Phoenix (PHX), Dallas (DFW) and Tijuana (TIJ).',
    transportInfo: 'We offer private transportation service from the airport to the resort. The journey is approximately 30 minutes through desert and coastal landscapes.',
    address: 'Carretera Transpeninsular Km 84, Ensenada Blanca, Loreto, Baja California Sur, Mexico',
    phone: '+52 (613) 134 1000',
    email: 'golf@tpcdanzantebay.com'
  })

  await prisma.pageContent.upsert({
    where: { slug: 'location' },
    update: {
      title: 'Location',
      content: locationContent
    },
    create: {
      slug: 'location',
      title: 'Location',
      content: locationContent
    }
  })

  // Gallery Page (renamed from galeria)
  const galleryContent = JSON.stringify({
    heroTitle: 'GALLERY',
    heroSubtitle: 'Discover the beauty of Danzante Bay',
    heroImage: 'https://images.unsplash.com/photo-1593111774240-d529f12db460?q=80&w=2070&auto=format&fit=crop'
  })

  await prisma.pageContent.upsert({
    where: { slug: 'gallery' },
    update: {
      title: 'Gallery',
      content: galleryContent
    },
    create: {
      slug: 'gallery',
      title: 'Gallery',
      content: galleryContent
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
