import Image from "next/image";
import Subjects from "../_components/common/Subjects";
import Frame from "@/public/images/Frame.png";
export default async function Home(): Promise<JSX.Element> {
  return (
    <>
      <div className="w-full gap-8 bg-white p-3 flex mb-5 rounded-2xl">
        <div className="image-container">
          <Image src={Frame} alt="image" />
        </div>
        <div className="w-[60%]">
          <h3 className="text-[#4461F2]">Samer Goda</h3>
          <p className="text-[#979CA3]">Voluptatem aut</p>
          <div className="">
            <div className="w-full mt-3 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded-full w-7/12"></div>
            </div>
            <div className="output-data-icons flex justify-between">
            <div className="mt-3 items-center gap-2 flex">
                  <span className=" rounded-[16px] shadow-[0px_18px_30px_0px_#4461f21c] p-3 border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <path
                        d="M34.5 11.5391H24.5V7.125C24.5 6.43359 23.9414 5.875 23.25 5.875H7.3125V4.3125C7.3125 4.14062 7.17188 4 7 4H4.8125C4.64062 4 4.5 4.14062 4.5 4.3125V34.9375C4.5 35.1094 4.64062 35.25 4.8125 35.25H7C7.17188 35.25 7.3125 35.1094 7.3125 34.9375V24.625H17V29.0391C17 29.7305 17.5586 30.2891 18.25 30.2891H34.5C35.1914 30.2891 35.75 29.7305 35.75 29.0391V12.7891C35.75 12.0977 35.1914 11.5391 34.5 11.5391Z"
                        fill="#4461F2"
                      />
                    </svg>
                  </span>
                  <div className="">

                  <h4 className="text-[#696F79] font-bold">27</h4>
                  <p className="text-[#696F79]">Quiz Passed</p>
                  </div>
            </div>
            <div className="mt-3 items-center gap-2 flex">
                  <span className=" rounded-[16px] shadow-[0px_18px_30px_0px_#4461f21c] p-3 border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <path
                        d="M34.5 11.5391H24.5V7.125C24.5 6.43359 23.9414 5.875 23.25 5.875H7.3125V4.3125C7.3125 4.14062 7.17188 4 7 4H4.8125C4.64062 4 4.5 4.14062 4.5 4.3125V34.9375C4.5 35.1094 4.64062 35.25 4.8125 35.25H7C7.17188 35.25 7.3125 35.1094 7.3125 34.9375V24.625H17V29.0391C17 29.7305 17.5586 30.2891 18.25 30.2891H34.5C35.1914 30.2891 35.75 29.7305 35.75 29.0391V12.7891C35.75 12.0977 35.1914 11.5391 34.5 11.5391Z"
                        fill="#4461F2"
                      />
                    </svg>
                  </span>
                  <div className="">

                  <h4 className="text-[#696F79] font-bold">13 min</h4>
                  <p className="text-[#696F79]">Fastest Time</p>
                  </div>
            </div>
            <div className="mt-3 items-center gap-2 flex">
                  <span className=" rounded-[16px] shadow-[0px_18px_30px_0px_#4461f21c] p-3 border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <path
                        d="M34.5 11.5391H24.5V7.125C24.5 6.43359 23.9414 5.875 23.25 5.875H7.3125V4.3125C7.3125 4.14062 7.17188 4 7 4H4.8125C4.64062 4 4.5 4.14062 4.5 4.3125V34.9375C4.5 35.1094 4.64062 35.25 4.8125 35.25H7C7.17188 35.25 7.3125 35.1094 7.3125 34.9375V24.625H17V29.0391C17 29.7305 17.5586 30.2891 18.25 30.2891H34.5C35.1914 30.2891 35.75 29.7305 35.75 29.0391V12.7891C35.75 12.0977 35.1914 11.5391 34.5 11.5391Z"
                        fill="#4461F2"
                      />
                    </svg>
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
      <div className="bg-white flex p-3 rounded-2xl">
        <Subjects />
      </div>
    </>
  );
}
