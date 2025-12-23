import React from "react"

const Additional = () => {
  return (
    <section className="bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-3xl font-serif font-semibold mb-8">
          A vast selection of used & vintage books
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
            <img
              src="https://picsum.photos/seed/vintage1/600/400"
              alt="Vintage paperbacks"
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2">
                Vintage paperbacks
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                You can buy vintage used Penguin paperbacks from AbeBooks.
                Orange is the most famous color but Penguin had a whole
                spectrum of colors to distinguish their books.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
            <img
              src="https://picsum.photos/seed/vintage2/600/400"
              alt="1950s & 1960s fiction"
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2">
                Fiction from the 1950s & 1960s
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                You can purchase a wide variety of vintage fiction from
                years gone by, including science fiction, fantasy, and
                crime from pioneering authors.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
            <img
              src="https://picsum.photos/seed/vintage3/600/400"
              alt="Out-of-print books"
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2">
                Out-of-print books
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Most books, aside from bestsellers, are out-of-print.
                However, copies can still be purchased thanks to our
                network of sellers who specialize in rare titles.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Additional 

