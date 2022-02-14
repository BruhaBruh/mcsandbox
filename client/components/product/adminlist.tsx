import React from "react";
import { Product } from "../../generated/graphql";
import Button from "../button";
import AdminProductTableRow from "./admintablerow";

const AdminProductList: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow-md overflow-hidden border-b border-neutral-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                  >
                    Изображение
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                  >
                    Название
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                  >
                    Тип
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                  >
                    Цена
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <Button variant="text" color="info" className="sr-only">
                      Редактировать
                    </Button>
                    <Button variant="text" color="error" className="sr-only">
                      Удалить
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-neutral-50 divide-y divide-neutral-200">
                {products.map((p) => (
                  <AdminProductTableRow product={p} key={p.productId} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductList;
