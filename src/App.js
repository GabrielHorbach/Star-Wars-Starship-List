import { useEffect, useState } from 'react'

import Header from './components/Header'
import { getManufacturersAndStarships } from './services/swapi'
import { TABLE_HEADER } from './constants'
import './App.css'

function App() {
  const [manufacturers, setManufacturer] = useState([])
  const [starships, setStarships] = useState([])
  const [selectedManufacturer, setSelected] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { starships, manufacturers } = await getManufacturersAndStarships()
      setStarships(starships)
      setManufacturer(manufacturers)
      setLoading(false)
    }

    fetchData()
  }, [])

  function handleSelection(e) {
    setSelected(e.target.value)
  }

  const tableResults = !selectedManufacturer
    ? starships
    : starships.filter(starship => starship.manufacturer === selectedManufacturer)

  return (
    <div className="App">
      <Header />

      <div className="selection">
        <label htmlFor="manufacturer">Choose a manufacturer:</label>
        <select name="manufacturer" id="manufacturer" onChange={handleSelection}>
          <option key="all" value="">All manufacturers</option>
          {manufacturers.map(manufacturer => (
            <option
              key={manufacturer}
              value={manufacturer}>
              {manufacturer}
            </option>
          ))}
        </select>
      </div>

      <table className="results">
        <tr>
          {TABLE_HEADER.map(header => <th key={header}>{header}</th>)}
        </tr>

        {loading && <p className="alignedCenter">Loading...</p>}

        {tableResults.map(starship => (
          <tr key={starship.name}>
            <td>{starship.name}</td>
            <td>{starship.model}</td>
            <td>{starship.starship_class}</td>
            <td className="alignedCenter">{starship.cost_in_credits}</td>
            <td className="alignedCenter">{starship.length}</td>
            <td className="alignedCenter">{starship.crew}</td>
            <td className="alignedCenter">{starship.passengers}</td>
            <td className="alignedCenter">{starship.cargo_capacity}</td>
            <td className="alignedCenter">{starship.consumables}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default App
