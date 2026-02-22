import { YachtProduct } from '@/types/product-types';
import Link from 'next/link';
import React from 'react';
import { BsBookmarkFill } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';

interface ProductCardProps {
  product: YachtProduct;
  isPremium?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isPremium,
}) => {
  console.log('Product in ProductCard:', product);
  const formatPrice = (price?: number) => {
    if (!price) return 'Price on request';
    return `$${price.toLocaleString('en-US')}`;
  };

  return (
    <Link
      href={`/search-listing/${product.id}`}
      className="relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition group"
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/2.6]">
        <img
          src={product.image || product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition"
        />

        {isPremium && (
          <span className="absolute top-2 right-3">
            <BsBookmarkFill className="text-4xl text-accent" />
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 pb-16">
        <div className="flex items-center gap-1 text-gray-500 mb-2">
          <IoLocationOutline />
          <span className="text-sm">{product.location}</span>
        </div>

        <h3 className="text-lg font-semibold mb-4 truncate">{product.name}</h3>

        <div className="flex justify-between text-sm border-y py-3">
          <div>
            <p className="text-gray-400">Make</p>
            <p>{product.brand_make || product.brand}</p>
          </div>
          <div>
            <p className="text-gray-400">Model</p>
            <p>{product.model}</p>
          </div>
          <div>
            <p className="text-gray-400">Year</p>
            <p>
              {product.buildYear ?? product.year ?? product.built_year ?? '-'}
            </p>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="absolute bottom-0 w-full p-5 bg-white">
        <p className="text-lg font-semibold text-primary">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
