import React from 'react'
import LinkItem from '@components/simple/LinkItem';

export function LinkList({links}) {  
  return (
    <>
      {
        links != undefined ?
        <Links links={links} />
        :
        ''
      }
    </>
  );
}

function Links({links, admin}){
  return links ? links.map((link) => <LinkItem link={link} key={link.slug} admin={admin} />) : null;
}
