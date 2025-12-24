import { YachtProduct } from '@/types/product-types-demo';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsBookmarkFill } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';

interface ProductCardProps {
  product: YachtProduct;
  isPremium: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isPremium }) => {
  const formatPrice = (price: number | undefined) => {
    if (!price || price === 0) {
      return 'Price on request';
    }
    return `$${price.toLocaleString('en-US')}`;
  };

  // Use product link if available, otherwise use id or fallback to 2
  const productLink =
    'link' in product && product.link
      ? product.link
      : 'id' in product && product.id
        ? `/search-listing/${product.id}`
        : `/search-listing/${2}`;

  return (
    <Link
      href={productLink}
      className="relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
    >
      {/* Image Section with Bookmark */}
      <div className="relative w-full aspect-[4/2.6] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          height={500}
          width={900}
          className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300"
        />
        {isPremium && (
          <button className="absolute -top-1 right-4" aria-label="Bookmark">
            <BsBookmarkFill className="text-5xl text-accent" />
          </button>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 pb-5">
        {/* Location */}
        <div className="flex items-center gap-1 text-gray-400 mb-3">
          <IoLocationOutline className="text-xl text-black" />
          <span className="text-lg font-normal">{product.location}</span>
        </div>

        {/* Product Name and Year */}
        <h3 className="text-xl font-semibold mb-4 truncate">{product.name}</h3>

        {/* Specs Grid */}
        <div className="flex items-start justify-between gap-4 mb-10 border-y border-gray-200 py-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Make</p>
            <p className="text-sm font-medium text-gray-900">
              {product.brand_make}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Model</p>
            <p className="text-sm font-medium text-gray-900">{product.model}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Year</p>
            <p className="text-sm font-medium text-gray-900">
              {product.built_year}
            </p>
          </div>
        </div>
      </div>
      {/* Price */}
      <div className="absolute bottom-0 left-0 w-full p-5">
        <p className="text-xl font-semibold text-primary">
          Price: {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
