/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            {
                hostname: "images.pexels.com"
            }
        ]
    }
};

export default nextConfig;
