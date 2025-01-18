import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";

export default function Container() {
  return (
    <main className="h-full w-full bg-yellow-500">
      <Header />

      {/* Content */}
      <div className="container pt-20">
        <div className="mb-10 flex w-full justify-start text-xl">
          Back to Home
        </div>

        <p className="mb-14 text-center text-5xl">Proof of Concept</p>

        {/* Title */}
        <p className="text-start text-2xl">Coin - The Seeker of Insights</p>
        <p>Last update: 12/03/2024</p>

        <div className={`my-[40px] h-[1px] w-full bg-[#0000003D]`}></div>

        {/* Core Concept */}
        <p className="mb-5 text-3xl">Core Concept</p>
        <p className="mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>

        {/* Technical Implementation */}
        <p className="mb-5 text-3xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <div className="mb-8 w-full rounded-lg border bg-black/50">
          <ol className="list-outside list-decimal px-8 py-4">
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              <ul className="list-outside list-disc pl-[20px]">
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
              </ul>
            </li>
          </ol>
        </div>
      </div>

      <Footer />
    </main>
  );
}
