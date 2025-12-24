/* eslint-disable @typescript-eslint/no-explicit-any */

const ItemSpecifications = ({ specifications }: any) => {
  const specsArray: any[] = Array.isArray(specifications)
    ? specifications
    : specifications && typeof specifications === 'object'
      ? Object.entries(specifications).map(([name, value]) => ({ name, value }))
      : [];

  const formatValue = (spec: any) => {
    if (spec && Object.prototype.hasOwnProperty.call(spec, 'value')) {
      const v = spec.value;
      if (v === null || v === undefined || v === '') return '-';
      if (Array.isArray(v)) return v.join(', ');
      if (typeof v === 'boolean') return v ? 'Yes' : 'No';
      if (typeof v === 'number') return v.toLocaleString();
      return String(v);
    }

    if (spec.valueString != null) return spec.valueString;
    if (spec.valueNumber != null) return spec.valueNumber.toLocaleString();
    if (spec.valueBoolean != null) return spec.valueBoolean ? 'Yes' : 'No';
    if (spec.valueDate != null)
      return new Date(spec.valueDate).toLocaleDateString();
    if (spec.valueMultiple != null && spec.valueMultiple.length > 0) {
      return spec.valueMultiple.join(', ');
    }

    return '-';
  };

  const formatLabel = (name: string) => {
    if (!name) return '';
    if (name.includes(' ')) {
      return name
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
        .trim();
    }

    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
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
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 rounded border border-gray-100">
            {specsArray.map((spec: any, index: number) => (
              <div
                key={`${spec.name ?? spec.label}-${index}`}
                className="text-left border-b border-gray-200"
              >
                <div className="grid grid-cols-2 items-center w-full  min-w-full">
                  <div className="text-sm md:text-base px-2 md:px-5 py-3 font-semibold bg-gray-100 h-full w-full">
                    {formatLabel(spec.name ?? spec.label)}
                  </div>
                  <div className="text-sm md:text-base px-2 md:px-5 py-3 bg-white h-full w-full">
                    {formatValue(spec)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemSpecifications;
