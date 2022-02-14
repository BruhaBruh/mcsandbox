/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "cdn.discordapp.com",
      "placeimg.com", // TODO: Remove in prod
      "cdn.fakercloud.com", // TODO: Remove in prod
      "i.postimg.cc", // TODO: Remove in prod
      "i.ibb.co",
    ],
  },
};
