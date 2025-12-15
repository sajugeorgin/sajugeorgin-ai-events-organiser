import { Category } from "@/types/categories";
import { Card, CardContent } from "../ui/card";
import { User2 } from "lucide-react";

interface CategoriesProps {
  categories: Category[];
  handleCategoryClick: (categoryId: string) => void;
}

const Categories = ({ categories, handleCategoryClick }: CategoriesProps) => {
  return (
    <section className="my-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* SECTION HEADER */}
      <div className="mb-8 md:mb-12">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex items-center justify-center size-10 rounded-lg bg-linear-to-br from-green-200 to-green-500">
            <User2 className="size-5" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold">Search by Category</h2>
        </div>

        <p className="text-sm md:text-base text-muted-foreground ml-[55px]">
          Find relevant events faster
        </p>
      </div>

      {/* CATEGORY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="py-2 group cursor-pointer hover:shadow-2xl hover:scale-102 transition-all hover:border-purple-500"
            onClick={() => {
              handleCategoryClick(category.id);
            }}
          >
            <CardContent className="flex flex-col lg:flex-row items-start lg:items-center gap-3">
              <div className="text-xl sm:text-2xl md:3xl">{category.icon}</div>

              <div className="flex flex-col text-sm md:text-base items-start gap-1">
                <h3 className="font-semibold">{category.label}</h3>

                <p className="text-muted-foreground">
                  {category.count} Event{category.count !== 1 ? "s" : ""}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Categories;
