interface Props {
  outgoing: boolean
}

const SideArrowIcon = ({ outgoing }: Props) => {
  if (outgoing) {
    return (
      <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24.5" cy="24.5" r="24" fill="#F9E3E0" />
        <mask id="mask0_4386_258" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="14" y="14" width="21" height="21">
          <rect x="14.5" y="14.5" width="20" height="20" fill="#C4C4C4" />
        </mask>
        <g mask="url(#mask0_4386_258)">
          <path d="M18.9998 30.5833L18.4165 30L28.4998 19.9167H22.4165V19.0833H29.9165V26.5833H29.0832V20.5L18.9998 30.5833Z" fill="#961100" />
        </g>
      </svg>
    )
  }
  return (
    <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24.5" cy="24.5" r="24" fill="#E3FCF2" />
      <mask id="mask0_4386_243" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="14" y="14" width="21" height="21">
        <rect x="14.5" y="14.5" width="20" height="20" fill="#C4C4C4" />
      </mask>
      <g mask="url(#mask0_4386_243)">
        <path d="M19.25 29.75V22.25H20.0833V28.3333L30.1667 18.25L30.75 18.8333L20.6667 28.9167H26.75V29.75H19.25Z" fill="#075132" />
      </g>
    </svg>
  )

}

export default SideArrowIcon
