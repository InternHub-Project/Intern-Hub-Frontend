// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import { Box, Text, Textarea } from "@mantine/core";

// export default function Question({ setQuestion, proLang, desExp , nameOption , nameDes ,onChange }) {
//   const questionType = setQuestion.map((item) => (
//     <Box key={item._id}>
//       {item.type === "multiple_choice" ? (
//         <Box>
//           <Text fz={"19px"} fw={600}>
//             {item.question}
//           </Text>
//           {item.options.map((option) => (
//             <Box key={option}>
//               <input
//                 required
//                onChange={onChange}
//                 type="radio"
//                 value={proLang=option}
//                 name={nameOption}
//                 id={option}
//               />{" "}
//               <label
//                 style={{ color: "#454545", fontSize: "15px", marginTop: "5px" }}
//                 htmlFor={option}
//               >
//                 {option}
//               </label>
//             </Box>
//           ))}
//         </Box>
//       ) : (
//         <Box mt={20}>
//           <Text fz={"19px"} fw={600}>
//             {item.question}
//           </Text>
//           <Box>
//             <Textarea
//               required
//               onChange={onChange}
//               name={nameDes}
//               value={desExp}
//               autosize
//               minRows={5}
//               resize="vertical"
//               placeholder="..."
//             />
//           </Box>
//         </Box>
//       )}
//     </Box>
//   ));

//   return <Box>{setQuestion ? <>{questionType}</> : <></>}</Box>;
// }
