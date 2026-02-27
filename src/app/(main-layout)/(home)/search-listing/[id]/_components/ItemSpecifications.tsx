/* eslint-disable @typescript-eslint/no-explicit-any */
import { BoatEngine, BoatSpecification } from '@/types/product-types';
import React from 'react';

interface ItemSpecificationsProps {
  specifications: BoatSpecification[];
  engines?: BoatEngine[];
}

const ItemSpecifications = ({
  specifications,
  engines,
}: ItemSpecificationsProps) => {
  const specsArray: any[] = specifications.map((spec) => ({
    name: spec.key,
    value: spec.value,
  }));

  const formatValue = (spec: any) => {
    if (spec && Object.prototype.hasOwnProperty.call(spec, 'value')) {
      const v = spec.value;
      if (v === null || v === undefined || v === '') return '-';
      if (Array.isArray(v)) return v.join(', ');
      if (typeof v === 'boolean') return v ? 'Yes' : 'No';
      if (typeof v === 'number') return String(v);
      return String(v);
    }
    if (spec.valueString != null) return spec.valueString;
    if (spec.valueNumber != null) return String(spec.valueNumber);
    if (spec.valueBoolean != null) return spec.valueBoolean ? 'Yes' : 'No';
    if (spec.valueDate != null)
      return new Date(spec.valueDate).toLocaleDateString();
    if (spec.valueMultiple != null && spec.valueMultiple.length > 0)
      return spec.valueMultiple.join(', ');
    return '-';
  };

  const formatLabel = (name: string) => {
    if (!name) return '';
    if (name.includes(' '))
      return name
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
        .trim();
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  const formatEngineValue = (key: string, value: any): string => {
    if (value === null || value === undefined || value === '') return '-';
    if (typeof value === 'number') return String(value);
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    const strValue = String(value);
    if (strValue.includes('|')) return strValue.split('|').join(' ');
    return strValue;
  };

  if (!specifications || specifications.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden mt-6">
        <div className="bg-gray-100 px-6 py-4 flex">
          <h2 className="text-xl font-semibold text-black pb-2 text-left">
            Specifications
          </h2>
        </div>
        <div className="px-6 py-8 text-center text-gray-500">
          No specifications available
        </div>
      </div>
    );
  }

  return (
    <div className="px-1 md:px-4">
      <div className="py-2 flex">
        <h2 className="text-lg md:text-xl font-semibold text-black text-left">
          Specifications
        </h2>
      </div>
      <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 rounded border border-gray-100">
          {specsArray.map((spec: any, index: number) => (
            <React.Fragment key={index}>
              <div className="text-sm md:text-base px-2 md:px-5 py-3 font-semibold bg-gray-100 border-b border-gray-200 flex items-center">
                {formatLabel(spec.name ?? spec.label)}
              </div>
              <div className="text-sm md:text-base px-2 md:px-5 py-3 bg-white border-b border-r border-gray-200 flex items-center">
                {formatValue(spec)}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {engines && engines.length > 0 && (
        <div className="mt-6">
          <div className="py-2 flex">
            <h2 className="text-lg md:text-xl font-semibold text-black text-left">
              Engine Details
            </h2>
          </div>
          <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
            {engines.map((engine, engineIndex) => {
              const engineFields = Object.entries(engine).filter(
                ([, value]) =>
                  value !== null && value !== undefined && value !== '',
              );
              return (
                <div key={engineIndex} className="border-b last:border-b-0">
                  <div className="px-4 py-3 bg-gray-50 font-semibold">
                    Engine {engineIndex + 1}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4">
                    {engineFields.map(([key, value], fieldIndex) => (
                      <React.Fragment key={`${engineIndex}-${fieldIndex}`}>
                        <div className="text-sm md:text-base px-2 md:px-5 py-3 font-semibold bg-gray-100 border-b border-gray-200 flex items-center">
                          {formatLabel(key)}
                        </div>
                        <div className="text-sm md:text-base px-2 md:px-5 py-3 bg-white border-b border-r border-gray-200 flex items-center">
                          {formatEngineValue(key, value)}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemSpecifications;
