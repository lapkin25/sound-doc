/** @type {import('next').NextConfig} */


const nextConfig = {
  output: 'export',            // вместо сервера — экспорт статики в папку out/
  basePath: '/sound-doc',       
  images: { unoptimized: true }, // оптимизация картинок требует сервера — отключаем
  trailingSlash: true,         // чтобы навигация по Pages не отдавала 404
};
export default nextConfig;
