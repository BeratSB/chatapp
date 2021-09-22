import React, { useRef, useState, useEffect, } from 'react';
import { query, onSnapshot, queryEqual } from 'firebase/firestore';


function useCollectionData(query) {
    const [data, setData] = useState([])
    const [queryState, setQueryState] = useState(query)
    useEffect(() => {
      if (!queryEqual(queryState, query)) {
        setQueryState(query)
      }
    }, [query])
    useEffect(() => {
      const unsubscribe = onSnapshot(queryState, snapshot => console.log(snapshot) || setData(snapshot.docs.map(doc => doc.data())))
      return () => { unsubscribe() }
    }, [queryState])
    return data
  }

  export default useCollectionData