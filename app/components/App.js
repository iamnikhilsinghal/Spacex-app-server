import React, { Fragment } from 'react';
import axios from 'axios';
import styles from './app.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.launchYears = [
      '2006',
      '2007',
      '2008',
      '2009',
      '2010',
      '2011',
      '2012',
      '2013',
      '2014',
      '2015',
      '2016',
      '2017',
      '2018',
      '2019',
      '2020',
    ];

    this.launchAndLanding = ['true', 'false'];
  }

  state = {
    programs: [],
    launchSuccess: '',
    landsuccess: '',
    launchYear: '',
  };

  componentDidMount() {
    this.getSpacexPrograms();
  }

  getSpacexPrograms = (launchSucc = '', landsucc = '', launchYr = '') => {
    this.setState({ programs: [] });
    let programApi = `https://api.spaceXdata.com/v3/launches?limit=100`;
    if (launchSucc.length) {
      this.setState({ launchSuccess: launchSucc });
      programApi = programApi + `&launch_success=${launchSucc}`;
    }
    if (landsucc.length) {
      this.setState({ landsuccess: landsucc });
      programApi = programApi + `&land_success=${landsucc}`;
    }
    if (launchYr.length) {
      this.setState({ launchYear: launchYr });
      programApi = programApi + `&launch_year=${launchYr}`;
    }
    axios.get(programApi).then((res) => {
      this.setState({ programs: res.data });
    });
  };

  resetFilter = () => {
    this.setState({ launchSuccess: '', landsuccess: '', launchYear: '' });
    this.getSpacexPrograms();
  };

  getSeparator = (title) => {
    const { seperator, filterTitle, line } = styles;

    return (
      <div className={seperator}>
        <p className={filterTitle}>{title}</p>
        <hr className={line} />
      </div>
    );
  };

  render() {
    const { programs, launchSuccess, landsuccess, launchYear } = this.state;
    const {
      mainContainer,
      header,
      homeContainer,
      leftNav,
      titleHeader,
      cardsItem,
      card,
      cardImage,
      cardContent,
      cardTitle,
      cardText,
      cardSubtitle,
      main,
      cards,
      resetBtn,
      filterText,
      filterSection,
      mainRow,
      mainCol,
      m0,
      col6,
      col12,
      filterItem,
      noDataFound,
    } = styles;

    return (
      <div className={mainContainer}>
        <div className={header}>SpaceX Launch Programs</div>
        <div className={homeContainer}>
          <div className={leftNav}>
            <h4 className={titleHeader}>Filters</h4>
            <button
              type='button'
              className={resetBtn}
              onClick={this.resetFilter}
            >
              Reset Filters
            </button>
            {this.getSeparator('Launch Year')}
            <div className={`${mainRow} ${m0}`}>
              {this.launchYears.map((year, index) => (
                <div
                  key={index}
                  className={`${mainCol} ${col6} ${filterItem}`}
                  onClick={() => {
                    this.getSpacexPrograms(launchSuccess, landsuccess, year);
                  }}
                >
                  <div className={filterText}>{year}</div>
                </div>
              ))}
            </div>
            {this.getSeparator('Successful Launch')}
            <div className={`${mainRow} ${m0}`}>
              {' '}
              {this.launchAndLanding.map((val, index) => (
                <div
                  key={index}
                  className={`${mainCol} ${col6} ${filterItem}`}
                  onClick={() => {
                    this.getSpacexPrograms(val, landsuccess, launchYear);
                  }}
                >
                  <div className={filterText}>{val}</div>
                </div>
              ))}
            </div>
            {this.getSeparator('Successful Landing')}
            <div className={`${mainRow} ${m0}`}>
              {' '}
              {this.launchAndLanding.map((val, index) => (
                <div
                  key={index}
                  className={`${mainCol} ${col6} ${filterItem}`}
                  onClick={() => {
                    this.getSpacexPrograms(launchSuccess, val, launchYear);
                  }}
                >
                  <div className={filterText}>{val}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={main}>
            <ul className={cards}>
              {programs.length !== 0 ? (
                programs.map((item, index) => (
                  <li className={cardsItem} key={index}>
                    <div className={card}>
                      <div className={cardImage}>
                        <img src={item.links.mission_patch} alt='missing' />
                      </div>
                      <div className={cardContent}>
                        <h3 className={cardTitle}>
                          {' '}
                          {item.mission_name} #{item.flight_number}
                        </h3>
                        <div className={cardText}>
                          <div className={mainRow}>
                            <div className={`${mainCol} ${col12}`}>
                              <span className={cardSubtitle}>
                                Mission Ids:{' '}
                              </span>
                              <ul className={m0}>
                                {item.mission_id.map((id, index) => (
                                  <li key={index}>{id}</li>
                                ))}
                              </ul>
                            </div>
                            <div className={`${mainCol} ${col12}`}>
                              <span className={cardSubtitle}>
                                Launch Year:{' '}
                              </span>
                              {item.launch_year}
                            </div>
                            <div className={`${mainCol} ${col12}`}>
                              <span className={cardSubtitle}>
                                Successful Launch:{' '}
                              </span>
                              {!item.launch_success ? 'false' : 'true'}
                            </div>
                            <div className={`${mainCol} ${col12}`}>
                              <span className={cardSubtitle}>
                                Successful Landing:{' '}
                              </span>
                              {item.rocket &&
                              item.rocket.first_stage &&
                              item.rocket.first_stage.cores &&
                              item.rocket.first_stage.cores[0] &&
                              item.rocket.first_stage.cores[0].land_success
                                ? !item.rocket.first_stage.cores[0].land_success
                                  ? 'false'
                                  : 'true'
                                : ''}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div className={noDataFound}>Loading..</div>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
