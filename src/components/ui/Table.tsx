import InvertedCorner from "./InvertedCorners";

type Header<T> = {
  key: keyof T | string;        // field in the data
  label: string;                // column title
  render?: (value: any, row: T) => React.ReactNode; // optional custom render
};

type TableProps<T> = {
  headers: Header<T>[];
  data: T[];
  label:string
};

export default function Table<T extends { id: string | number }>({
  headers,
  data,
  label
}: TableProps<T>) {
  return (
    <div className=" ">
      <InvertedCorner label={label} pageBg="#fff" className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-gray-700">
            <thead>
              <tr className="border-b border-gray-300 *:px-4 *:py-3 *:font-semibold">
                {headers.map((h) => (
                  <th key={String(h.key)}>{h.label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {data.map((row) => (
                <tr
                  key={row.id}
                  className="cursor-pointer hover:bg-black/5"
                >
                  {headers.map((h) => {
                    const value = (row as any)[h.key];
                    return (
                      <td key={String(h.key)} className="px-4 py-3">
                        {h.render ? h.render(value, row) : value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </InvertedCorner>
    </div>
  );
}
