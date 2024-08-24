import Link from 'next/link';
import React from 'react'

interface TextLogoProps {
  text: string;
  color: string;
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
}

const TextLogo: React.FC<TextLogoProps> = ({ text, color, fontSize, fontWeight, fontFamily }) => {
  return (
    <Link
      href="/"
      style={{
        color,
        fontSize,
        fontWeight,
        fontFamily,
        margin: 0,
        padding: 0,
      }}
    >
      {text}
    </Link>
  )
}

export default TextLogo