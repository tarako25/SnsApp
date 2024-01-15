import React from 'react'

export default function ParseTag(text: any) {
    if (text === null || text == "") {
        return null;
      }
      return text.match(/#\S+|\S+/g).map((word: any, index: number) => {
        if (word.startsWith('#') || word.startsWith('＃')) {
          return word.substring(1)
        }
      });
}
