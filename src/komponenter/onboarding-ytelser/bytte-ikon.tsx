import { FunctionComponent } from "react";

interface Props {
  className: string;
}

const BytteIkon: FunctionComponent<Props> = ({ className }): JSX.Element => (
  <svg className={className} width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.4978 0H11.9988C11.4458 0 10.9988 0.448 10.9988 1C10.9988 1.553 11.4458 2 11.9988 2H16.4978C19.6858 2 21.9988 4.104 21.9988 7C21.9988 9.897 19.6858 12 16.4978 12H3.41275L6.70575 8.707C7.09675 8.316 7.09675 7.684 6.70575 7.293C6.31475 6.902 5.68275 6.902 5.29175 7.293L0.291752 12.293C-0.0952481 12.679 -0.0992481 13.317 0.291752 13.708L5.29175 18.707C5.48675 18.902 5.74275 19 5.99875 19C6.25475 19 6.51075 18.902 6.70575 18.707C7.09675 18.316 7.09675 17.684 6.70575 17.293L3.41275 14H16.4978C20.7738 14 23.9988 10.991 23.9988 7C23.9988 3.01 20.7738 0 16.4978 0Z"
      fill="#0067C5"
    />
  </svg>
);

export default BytteIkon;
