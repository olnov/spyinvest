// This file will store asset values and portfolio values in context and provide them to the PortfolioList component.

import React, { createContext, useState, useEffect } from 'react';
import { getMyAssets } from '../services/portfolioAssetServices';
import { getPortfolios } from '../services/PortfoliosServices';


 const Context = createContext();

export default Context;