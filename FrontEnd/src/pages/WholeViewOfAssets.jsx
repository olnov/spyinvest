import React from 'react'
import ApiView from '../components/PortfolioAssets/ApiView'

const wholeView = () => {
  return (
    <>

      <ApiView id={2} />
      <ApiView id={1} />
      <ApiView id={3} />
      <ApiView id={5} />
      <ApiView id={6} />

    </>

  )
}

export default wholeView