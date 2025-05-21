import Image from "next/image";
import Subjects from "../components/common/Subjects";
import Frame from "/public/images/Frame.png";
import { FaFlag } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { getServerSession } from "next-auth";

export default async function Home(): Promise<JSX.Element> {
  const session = await getServerSession();

  if (!session || !session.user) {
    throw new Error("Authentication required");
  }

  const { user } = session;
  // console.log("data", user);
  return (
    <>
      <div className="w-full gap-8 bg-white p-3 flex mb-5 rounded-2xl px-5">
        <div className="image-container">
          <Image src={user.image || Frame} alt="image" priority />
        </div>
        <div className="w-[60%]">
          <h3 className="text-[#4461F2]">{user.name}</h3>
          <p className="text-[#979CA3]">{user.email}</p>
          <div className="">
            <div className="w-full mt-3 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded-full w-7/12"></div>
            </div>
            <div className="output-data-icons mt-5 flex justify-between">
              <div className="mt-3 items-center gap-2 flex">
                <span className=" rounded-2xl shadow-md p-3 border">
                  <FaFlag color="#4461F2" size={31} />
                </span>
                <div className="">
                  <h4 className="text-[#696F79] font-bold">27</h4>
                  <p className="text-[#696F79]">Quiz Passed</p>
                </div>
              </div>
              <div className="mt-3 items-center gap-2 flex">
                <span className=" rounded-2xl shadow-md p-3 border">
                  <IoIosTime color="#4461F2" size={31} />
                </span>
                <div className="">
                  <h4 className="text-[#696F79] font-bold">13 min</h4>
                  <p className="text-[#696F79]">Fastest Time</p>
                </div>
              </div>
              <div className="mt-3 items-center gap-2 flex">
                <span className=" rounded-2xl shadow-md p-3 border">
                  <FaCheckCircle color="#4461F2" size={31} />
                </span>
                <div className="">
                  <h4 className="text-[#696F79] font-bold">200</h4>
                  <p className="text-[#696F79]">Correct Answers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-3 rounded-2xl  h-screen">
        <Subjects />
      </div>
    </>
  );
}
