//ハッシュタグParse
import Link from 'next/link'

export default function ParseHashtags(text: any) {
  if (text === null || text == "") {
    return null;
  }
  return text.match(/#\S+|\S+|　| /g).map((word: any, index: number) => {
    if (word.startsWith('#') || word.startsWith('＃')) {
      return <Link key={index} href={`/search?keyword=${encodeURIComponent(word)}`} className="text-blue-400">{word}</Link>;
    }
    return word;
  });
}