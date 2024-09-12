import Link from 'next/link';
import React from 'react'

interface TextLogoProps {
  text: string;
  color: string;
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
  marginTop?: boolean;
}

const TextLogo: React.FC<TextLogoProps> = ({ text, color, fontSize, fontWeight, fontFamily, marginTop = false }) => {
  return (
    <Link
      href="/"
      style={{
        color,
        fontSize,
        fontWeight,
        fontFamily,
        padding: 0,
      }}
      className={`${marginTop ? '-mt-2' : 'm-0'}`}
    >
      {text}
    </Link>
  )
}

export default TextLogo