import React, { useState, useEffect } from 'react'
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import Loader from './Loader';
import SearchIcon from "../images/search-icon.svg";

import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;

  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  // console.log(cryptos);
  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      <div className="search-crypto">

        <Input
          type="text"
          placeholder="Search for Cryptocurrencies..."
          className="search-field"
          onChange={(e) => setSearchTerm(e.target.value)}
        ></Input>
        <img className='seach-image' src={SearchIcon} alt="seach icon"></img>
      </div>

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p style={{ fontWeight: "500" }}>Price: $ {millify(currency.price)}</p>
                <p>Daily Change: <span className={currency.change < 0 ? "doRed" : "doGreen"}>{millify(currency.change)}%</span></p>
                <p>Market Cap: {millify(currency.marketCap)}</p>

              </Card>
            </Link>
          </Col>
        ))}

      </Row>
    </>
  )
}

export default Cryptocurrencies
