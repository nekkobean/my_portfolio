// // "use client";

// // import { useState } from "react";
// // import { Section, Button, Modal, TextField } from "@eloisallena/web_components";

// // export interface HomeProps {
// //   first_name?: string;
// //   middle_name?: string | null;
// //   last_name?: string;
// //   introduction?: string | null;
// // }

// // export default function Home({ info }: { info: HomeProps }) {
// //   const [isOpen, setOpen] = useState(false);

// //   return (
// //     <Section id="home" title="Dashboard" style="bg-gray-100">
// //       <div
// //         data-mode="light"
// //         className="flex min-h-[70vh] items-center justify-center rounded-2xl bg-white p-10 shadow-md"
// //       >
// //         <div className="max-w-2xl text-center">
// //           <h1 className="mb-4 text-4xl font-bold md:text-6xl hover:text-orange">
// //             Hello, I&apos;m {info.first_name} {info.middle_name}{" "}
// //             {info.last_name}
// //           </h1>
// //           <p className="text-base text-gray-600 md:text-lg">
// //            {info.introduction}
// //           </p>
// //           <div
// //             data-mode="light"
// //             className="flex justify-center max-w-full whitespace-nowrap  mt-5"
// //           >
// //             <Button
// //               variant="secondary"
// //               label="Download Cv"
// //               style="bg-secondary-button text-white hover:bg-orange hover:text-white"
// //               onClick={() => setOpen(true)}
// //             />
// //             <Modal
// //               isOpen={isOpen}
// //               title="Fill Out Form"
// //               onClose={() => setOpen(false)}
// //             >
// //               <TextField
// //                 labelText="Let's connect! Fill out the form to receive my latest CV."
// //                 id="name"
// //                 placeholder="Enter your name"
// //                 type="text"
// //               />
// //               <TextField
// //                 labelText=""
// //                 id="email"
// //                 placeholder="Enter your email"
// //                 type="email"
// //               />
// //               <TextField
// //                 labelText=""
// //                 id="reason"
// //                 placeholder="Please state your reason"
// //                 type="text"
// //               />
// //               <div className="flex justify-end gap-2 mt-5">
// //                 <Button variant="primary" label="Submit" />
// //                 <Button variant="secondary" label="Cancel" />
// //               </div>
// //             </Modal>
// //           </div>
// //         </div>
// //       </div>
// //     </Section>
// //   );
// // }
// "use client";

// import { useState } from "react";
// import { Section, Button, Modal, TextField } from "@eloisallena/web_components";

// export interface HomeProps {
//   first_name?: string;
//   middle_name?: string | null;
//   last_name?: string;
//   introduction?: string | null;
// }

// export default function Home({ info }: { info: HomeProps }) {
//   const [isOpen, setOpen] = useState(false);

//   return (
//     <Section
//       id="home"
//       title="Dashboard"
//       style="bg-gray-100 "
//       sectionTitleClassName="text-black text-2xl md:text-3xl lg:text-4xl"
//     >
//       <div
//         data-mode="light"
//         className="flex items-center justify-center rounded-2xl bg-white p-10 shadow-md"
//       >
//         <div className="flex w-full flex-col-reverse items-center gap-10 md:flex-row md:justify-between">
//           {/* Text - left */}
//           <div className="max-w-2xl text-center md:text-left">
//             <h1 className="mb-4 text-5xl font-bold md:text-5xl lg:text-5xl hover:text-orange">
//               Hello, I&apos;m {info.first_name} {info.middle_name}{" "}
//               {info.last_name}
//             </h1>
//             <p className="md:text-xl lg:text-2xl text-gray-600 mt-4">
//               {info.introduction}
//             </p>
//             <div
//               data-mode="light"
//               className="flex justify-center md:justify-start max-w-full whitespace-nowrap mt-8"
//             >
//               <Button
//                 variant="secondary"
//                 label="Download Cv"
//                 style="bg-secondary-button text-white hover:bg-orange hover:text-white text-lg md:text-xl px-8 py-4"
//                 onClick={() => setOpen(true)}
//               />
//               <Modal
//                 isOpen={isOpen}
//                 title="Fill Out Form"
//                 onClose={() => setOpen(false)}
//               >
//                 <TextField
//                   labelText="Let's connect! Fill out the form to receive my latest CV."
//                   id="name"
//                   placeholder="Enter your name"
//                   type="text"
//                 />
//                 <TextField
//                   labelText=""
//                   id="email"
//                   placeholder="Enter your email"
//                   type="email"
//                 />
//                 <TextField
//                   labelText=""
//                   id="reason"
//                   placeholder="Please state your reason"
//                   type="text"
//                 />
//                 <div className="flex justify-end gap-2 mt-5">
//                   <Button variant="primary" label="Submit" />
//                   <Button variant="secondary" label="Cancel" />
//                 </div>
//               </Modal>
//             </div>
//           </div>

//           {/* Image - right */}
//           <div className="shrink-0">
//             {/* eslint-disable-next-line @next/next/no-img-element */}
//             <img
//               src="portid.png"
//               alt={`${info.first_name ?? ""} ${info.last_name ?? ""}`}
//               className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-2xl"
//             />
//           </div>
//         </div>
//       </div>
//     </Section>
//   );
// }
"use client";

import { useState } from "react";

import {
  Section,
  Button,
  Modal,
} from "@eloisallena/web_components";

import CvRequestForm from "./CvRequestForm";

export interface HomeProps {
  first_name?: string;
  middle_name?: string | null;
  last_name?: string;
  introduction?: string | null;
}

export default function Home({
  info,
}: {
  info: HomeProps;
}) {
  const [isOpen, setOpen] = useState(false);

  return (
    <Section
      id="home"
      title=""
      style="bg-gray-100"
      sectionTitleClassName="text-black text-2xl md:text-3xl lg:text-4xl"
    >
      <div
        data-mode="light"
        className="flex items-center justify-center rounded-2xl bg-white p-10 shadow-md"
      >
        <div className="flex w-full flex-col-reverse items-center gap-10 md:flex-row md:justify-between">
          {/* Text */}
          <div className="max-w-2xl text-center md:text-left">
            <h1 className="mb-4 text-5xl font-bold hover:text-orange md:text-5xl lg:text-5xl">
              Hello, I&apos;m{" "}
              {info.first_name}{" "}
              {info.middle_name}{" "}
              {info.last_name}
            </h1>

            <p className="mt-4 text-gray-600 md:text-xl lg:text-2xl">
              {info.introduction}
            </p>

            <div
              data-mode="light"
              className="mt-8 flex max-w-full justify-center md:justify-start"
            >
              <Button
                type="button"
                variant="secondary"
                label="Request CV"
                style="bg-secondary-button px-8 py-4 text-lg text-white hover:bg-orange hover:text-white md:text-xl"
                onClick={() => setOpen(true)}
              />
            </div>

            <Modal
              isOpen={isOpen}
              title="Request My CV"
              onClose={() => setOpen(false)}
              bodyClassName="whitespace-normal"
            >
              <CvRequestForm
                onCancel={() =>
                  setOpen(false)
                }
              />
            </Modal>
          </div>

          {/* Portfolio image */}
          <div className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/portid.png"
              alt={`${info.first_name ?? ""} ${
                info.last_name ?? ""
              }`}
              className="h-64 w-64 rounded-2xl object-cover md:h-80 md:w-80 lg:h-96 lg:w-96"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}