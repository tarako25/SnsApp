import React from 'react'

export default function ParseTag(text: any) {
  if (text === null || text == "") {
      return null;
  }
  return text.match(/#\S+|\S+/g).filter((word: any) => {
      return word.startsWith('#') || word.startsWith('＃');
  }).map((word: any, index: number) => {
      return word.substring(1);
  });
}
