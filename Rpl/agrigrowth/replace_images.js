const fs = require('fs');
const path = require('path');

const urlMap = {
  "https://www.figma.com/api/mcp/asset/84e7de7d-b48c-4c40-b61c-1968ea49e884": "https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c8e?q=80&w=800&auto=format&fit=crop", // imgComplementary3
  "https://www.figma.com/api/mcp/asset/4213c44b-ff10-496c-bc18-99da660c77f8": "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=2000&auto=format&fit=crop", // imgWallpaperDelDia1
  "https://www.figma.com/api/mcp/asset/4883cfb8-9252-42df-9223-ab5a7e993930": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop", // imgRiceField01ByGarkiOnDeviantArt1
  "https://www.figma.com/api/mcp/asset/2a7fcedd-9f30-4d90-8e58-295d41707608": "https://api.iconify.design/lucide:leaf.svg?color=%23365a1a", // imgLogo / imgResultLogo
  "https://www.figma.com/api/mcp/asset/6e3b48fa-6d46-4818-a4c8-3a548e391ebd": "https://api.iconify.design/lucide:user-circle.svg?color=%23365a1a", // imgProfile / imgResultProfile
  "https://www.figma.com/api/mcp/asset/be7f6f1b-e0e9-42d0-9a7d-5a38770648c0": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop", // imgSawahBelakangKampus
  "https://www.figma.com/api/mcp/asset/156c8b0c-1b46-4d12-96c6-d779d2553252": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=800&auto=format&fit=crop", // imgJagungRezon
  "https://www.figma.com/api/mcp/asset/f5e4867b-98ce-4c79-8726-44f31b684eb1": "https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?q=80&w=800&auto=format&fit=crop", // imgPadiPraktikum (bawang)
  "https://www.figma.com/api/mcp/asset/2d7af9f5-776e-41f7-851d-32ef06f4449b": "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?q=80&w=800&auto=format&fit=crop", // imgRice2
  "https://www.figma.com/api/mcp/asset/4a93ea06-574f-4e48-adb5-27b4d06d8288": "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?q=80&w=800&auto=format&fit=crop", // imgResultField
  "https://www.figma.com/api/mcp/asset/692cc31f-379d-4deb-9cc0-25c87e666058": "https://api.iconify.design/lucide:wheat.svg?color=%23365a1a", // imgPlantSheaf
  "https://www.figma.com/api/mcp/asset/0f007e12-4c18-46b6-ad68-a156ab1be51b": "https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c8e?q=80&w=800&auto=format&fit=crop", // imgGrowthTrackerImage
  "https://www.figma.com/api/mcp/asset/d97cf4c8-1d28-42b7-b2d3-6398d7fe15a0": "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop", // imgDownload41
  "https://www.figma.com/api/mcp/asset/c54148b2-7c65-4659-a5fa-527677b9aead": "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop", // imgOverviewImage
  "https://www.figma.com/api/mcp/asset/2002dfd6-9832-40e4-9d01-b6bf12dbbc0c": "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2000&auto=format&fit=crop", // imgRainHero
  "https://www.figma.com/api/mcp/asset/e9b658e8-3ead-47e3-b268-5f096d5ade3d": "https://api.iconify.design/lucide:leaf.svg?color=%23365a1a", // imgBrandLogo
  "https://www.figma.com/api/mcp/asset/1dc6554e-4411-4918-9fc0-01d6afffe58d": "https://api.iconify.design/lucide:user-circle.svg?color=%23365a1a", // imgProfileAvatar
  "https://www.figma.com/api/mcp/asset/253027de-de40-4f4c-99c1-0c99edc84b39": "https://api.iconify.design/lucide:cloud.svg?color=%23365a1a", // imgCloudyIcon
  "https://www.figma.com/api/mcp/asset/4f68d557-5a73-4df1-a7ab-8d6f095f337d": "https://api.iconify.design/lucide:cloud-rain.svg?color=%23365a1a", // imgRainIcon
  "https://www.figma.com/api/mcp/asset/dda11176-c1ae-42fa-af1c-91d858f5e2ae": "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=2000&auto=format&fit=crop", // heroBackground
  "https://www.figma.com/api/mcp/asset/eb8b6bb8-e06c-41c9-9ec8-8aca0e559999": "https://api.iconify.design/lucide:leaf.svg?color=%23365a1a", // logoMark
  
  // also add some that might be missing just in case
  "https://www.figma.com/api/mcp/asset/90530aab-9c02-498f-97a0-e57018497d3e": "https://api.iconify.design/lucide:leaf.svg?color=%23365a1a", // imgLogo from features
  "https://www.figma.com/api/mcp/asset/03caec6e-0209-4de6-a510-5e7ebeb6fffd": "https://api.iconify.design/lucide:user-circle.svg?color=%23365a1a", // imgProfile from features
  "https://www.figma.com/api/mcp/asset/4a0a5fcd-125f-467e-8551-e507b578c5f6": "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=2000&auto=format&fit=crop" // heroBackground
};

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./app');
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf-8');
  let changed = false;
  
  // Also check for any figma MCP URL and replace it if we missed it
  content = content.replace(/(https:\/\/www\.figma\.com\/api\/mcp\/asset\/[a-f0-9\-]+)/g, (match) => {
    if (urlMap[match]) {
      changed = true;
      return urlMap[match];
    }
    console.log(`Warning: Unmapped URL found in ${f}: ${match}`);
    // fallback
    changed = true;
    return "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=800&auto=format&fit=crop";
  });

  if (changed) {
    fs.writeFileSync(f, content, 'utf-8');
    console.log(`Updated ${f}`);
  }
});
