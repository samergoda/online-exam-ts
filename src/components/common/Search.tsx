import Link from "next/link";

function Search() {
  return (
    <div>
      <div className="flex gap-3 mb-5 p-8">
        <input
          type="search"
          className="w-full border px-4 rounded-[20px] shadow-[0px_15px_40px_0px_#0000001a] bg-[url('/images/carbon_search.png')] bg-[10px] ps-10 bg-no-repeat"
          placeholder="Search Quiz"
        />
        <Link className="bg-[#4461F2] text-white w-auto p-2 text-nowrap rounded-[20px]" href="/exams">
          Start Quiz
        </Link>
      </div>
    </div>
  );
}

export default Search;
