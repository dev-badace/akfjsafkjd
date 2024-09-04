const { WebSocket } = require("ws");
const cookies = require("./cookies.json");

const cookieHeader = cookies
  .map((cookie) => `${cookie.name}=${cookie.value}`)
  .join("; ");

const options = {
  headers: {
    Host: "stake.bet",
    Pragma: "no-cache",
    "Cache-Control": "no-cache",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    Origin: "https://stake.bet",
    Cookie: cookieHeader,
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "en-US,en;q=0.9",
  },
};

const socket = new WebSocket(
  "wss://stake.bet/_api/websockets",
  ["graphql-transport-ws"],
  options
);

const subscriptions = [
  {
    id: "36be04b1-4409-46a9-b4f4-409dad13a107",
    type: "subscribe",
    payload: {
      query:
        "subscription Crash {\n  crash {\n    event {\n      ... on MultiplayerCrash {\n        ...MultiplayerCrash\n      }\n      ... on MultiplayerCrashBet {\n        ...MultiplayerCrashBet\n      }\n      __typename\n    }\n  }\n}\n\nfragment MultiplayerCrash on MultiplayerCrash {\n  id\n  status\n  multiplier\n  startTime\n  nextRoundIn\n  crashpoint\n  elapsed\n  timestamp\n  cashedIn {\n    id\n    user {\n      id\n      name\n      preferenceHideBets\n    }\n    payoutMultiplier\n    gameId\n    amount\n    payout\n    currency\n    result\n    updatedAt\n    cashoutAt\n    btcAmount: amount(currency: btc)\n  }\n  cashedOut {\n    id\n    user {\n      id\n      name\n      preferenceHideBets\n    }\n    payoutMultiplier\n    gameId\n    amount\n    payout\n    currency\n    result\n    updatedAt\n    cashoutAt\n    btcAmount: amount(currency: btc)\n  }\n}\n\nfragment MultiplayerCrashBet on MultiplayerCrashBet {\n  id\n  user {\n    id\n    name\n    preferenceHideBets\n  }\n  payoutMultiplier\n  gameId\n  amount\n  payout\n  currency\n  result\n  updatedAt\n  cashoutAt\n  btcAmount: amount(currency: btc)\n}\n",
    },
  },
  {
    id: "53eaa95a-4fcb-4082-b6bd-ed62b19a251a",
    type: "subscribe",
    payload: {
      query:
        "subscription OneTapSubscription($provider: OauthProviderEnum!, $sessionName: String!) {\n  oneTap(provider: $provider, sessionName: $sessionName) {\n    result {\n      __typename\n      ... on OauthRequest {\n        url\n      }\n      ... on OauthRegister {\n        identityId\n        requestEmail\n      }\n      ... on UserAuthenticatedSession {\n        ...UserAuthenticatedSession\n      }\n      ... on OauthUserExists {\n        user {\n          name\n        }\n      }\n      ... on OauthTfa {\n        loginToken\n      }\n    }\n  }\n}\n\nfragment UserSession on UserSession {\n  id\n  sessionName\n  ip\n  country\n  city\n  active\n  updatedAt\n}\n\nfragment UserBalance on UserBalance {\n  available {\n    amount\n    currency\n  }\n  vault {\n    amount\n    currency\n  }\n}\n\nfragment UserVerification on IdentityUserVerification {\n  status\n  verified\n}\n\nfragment AgeVerification on IdentityAgeVerification {\n  id\n  active\n  birthDate\n  createdAt\n  expireAt\n  type\n  user {\n    id\n    name\n  }\n  verified\n}\n\nfragment AddressVerification on IdentityAddressVerification {\n  active\n  city\n  country\n  createdAt\n  expireAt\n  id\n  state\n  street\n  type\n  user {\n    id\n    name\n  }\n  verified\n  zip\n}\n\nfragment DocumentVerification on IdentityDocumentVerification {\n  active\n  createdAt\n  documentBirthDate\n  documentCity\n  documentCountry\n  documentExpiry\n  documentFirstName\n  documentId\n  documentLastName\n  documentNationality\n  documentState\n  documentStreet\n  documentType\n  documentZip\n  expireAt\n  id\n  type\n  user {\n    id\n    name\n  }\n  verified\n}\n\nfragment RiskVerification on IdentityRiskVerification {\n  active\n  createdAt\n  expireAt\n  id\n  nationalityCountry\n  nonPoliticallyExposed\n  nonThirdPartyAccount\n  preferredName\n  type\n  user {\n    id\n    name\n  }\n  verified\n}\n\nfragment EmploymentVerification on IdentityEmploymentVerification {\n  active\n  createdAt\n  employerCity\n  employerCountry\n  employerName\n  employerPhone\n  employerState\n  employerStreet\n  employerZip\n  expireAt\n  id\n  type\n  user {\n    id\n    name\n  }\n  verified\n  occupation\n}\n\nfragment UserAuth on User {\n  id\n  name\n  email\n  hasPhoneNumberVerified\n  hasEmailVerified\n  hasPassword\n  intercomHash\n  createdAt\n  hasTfaEnabled\n  mixpanelId\n  hasOauth\n  isMaxBetEnabled\n  isReferred\n  isSportsbookExcluded\n  registeredWithVpn\n  flags {\n    flag\n    createdAt\n  }\n  signupCode {\n    code {\n      code\n    }\n  }\n  roles {\n    name\n  }\n  optionalFeatures\n  balances {\n    ...UserBalance\n  }\n  activeClientSeed {\n    id\n    seed\n  }\n  previousServerSeed {\n    id\n    seed\n  }\n  activeDepositBonus {\n    status\n    minDepositValue\n    maxDepositValue\n    maxBetMultiplier\n    bonusMultiplier\n    expectedAmountMultiplier\n    currency\n  }\n  activeServerSeed {\n    id\n    seedHash\n    nextSeedHash\n    nonce\n    blocked\n  }\n  veriffStatus\n  verifications {\n    userVerification {\n      ...UserVerification\n    }\n    ageVerification {\n      ...AgeVerification\n    }\n    addressVerification {\n      ...AddressVerification\n    }\n    documentVerification {\n      ...DocumentVerification\n    }\n    riskVerification {\n      ...RiskVerification\n    }\n    employmentVerification {\n      ...EmploymentVerification\n    }\n  }\n  termsOfService {\n    status\n  }\n  veriffBiometricVerificationStatus\n  notificationCount\n  currentPlaySession {\n    fitToPlay\n  }\n}\n\nfragment UserAuthenticatedSession on UserAuthenticatedSession {\n  token\n  session {\n    ...UserSession\n    user {\n      ...UserAuth\n    }\n  }\n}\n",
      variables: { provider: "google", sessionName: "Chrome (Unknown)" },
    },
  },
  {
    id: "5761b357-59cd-4f2b-857c-9030d9cae940",
    type: "subscribe",
    payload: {
      key: "1age5vl",
      query:
        "subscription Announcements {\n  announcements {\n    ...Announcement\n    __typename\n  }\n}\n\nfragment Announcement on Announcement {\n  id\n  name\n  message\n  colour\n  location\n  expired\n  startTime\n  endTime\n  __typename\n}\n",
      context: {
        url: "/_api/graphql",
        preferGetMethod: false,
        requestPolicy: "network-only",
        suspense: false,
      },
    },
  },
  {
    id: "422fa28c-5220-49a6-ad63-5b581fa052ef",
    type: "subscribe",
    payload: {
      key: "h4mjbm",
      query:
        "subscription RaceStatus {\n  raceStatus {\n    ...RaceFragment\n    __typename\n  }\n}\n\nfragment RaceFragment on Race {\n  id\n  name\n  description\n  currency\n  type\n  startTime\n  endTime\n  status\n  scope\n  promotionPeriod\n  __typename\n}\n",
      context: {
        url: "/_api/graphql",
        preferGetMethod: false,
        suspense: false,
        requestPolicy: "cache-first",
      },
    },
  },
  {
    id: "23936baa-fdc1-4dac-9ee3-7d84aef70a1d",
    type: "subscribe",
    payload: {
      key: "o7ehxs",
      query:
        "subscription FeatureFlagSubscription {\n  featureFlagUpdates {\n    ...FeatureFlagFragment\n    __typename\n  }\n}\n\nfragment FeatureFlagFragment on FeatureFlag {\n  id\n  name\n  createdAt\n  config {\n    ... on AgeVerificationFlagConfig {\n      minAge\n      enabled\n      type\n      __typename\n    }\n    ... on AddressVerificationFlagConfig {\n      bannedCountries\n      bannedStates\n      enabled\n      type\n      __typename\n    }\n    ... on DocumentVerificationFlagConfig {\n      provider\n      enabled\n      type\n      __typename\n    }\n    ... on RiskVerificationFlagConfig {\n      allowPoliticallyExposedPersons\n      allowThirdPartyAccounts\n      enabled\n      type\n      __typename\n    }\n    ... on PlaySessionFlagConfig {\n      expiryTime\n      enabled\n      type\n      __typename\n    }\n    ... on EvolutionOssProviderFlagConfig {\n      types\n      providers\n      enabled\n      type\n      __typename\n    }\n    ... on BiometricVerificationFlagConfig {\n      integration\n      enabled\n      type\n      __typename\n    }\n    ... on BooleanFlagConfig {\n      enabled\n      type\n      __typename\n    }\n    ... on BreezeFlagConfig {\n      enabled\n      type\n      onRampEnabled\n      offRampEnabled\n      __typename\n    }\n    ... on TransactionEligibilityFlagConfig {\n      enabled\n      cryptoDeposits\n      cryptoWithdrawals\n      fiatDeposits\n      fiatWithdrawals\n      type\n      __typename\n    }\n    ... on CashierNameMatchConfig {\n      type\n      cashierNameMatchProviders\n      closedBetaUsers\n      closedBeta\n      enabled\n      matchThreshold\n      __typename\n    }\n    ... on SweepsPaymentAccountManagerConfig {\n      enabled\n      type\n      enforced\n      __typename\n    }\n    ... on SbKinesisFlagConfig {\n      type\n      enabled\n      rbInactiveBet\n      rbInactiveBetEvent\n      rbInactiveBetOutcome\n      sbInactiveBet\n      sbInactiveBetEvent\n      sbInactiveBetOutcome\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n",
      context: {
        url: "/_api/graphql",
        preferGetMethod: false,
        requestPolicy: "network-only",
        suspense: false,
      },
    },
  },
];

socket.addEventListener("open", () => {
  console.log("open");
  socket.send(
    JSON.stringify({
      type: "connection_init",
      payload: { language: "en", lockdownToken: "s5MNWtjTM5TvCMkAzxov" },
    })
  );
});

socket.addEventListener("close", (e) => {
  console.log("close");
  console.log(e);
});
socket.addEventListener("error", (e) => {
  console.log("error");
  console.log(socket);
  console.log(e);
});
socket.addEventListener("message", (e) => {
  const data = JSON.parse(e.data);

  switch (data.type) {
    case "connection_ack": {
      subscriptions.map((sub) => {
        socket.send(JSON.stringify(sub));
      });
      break;
    }

    default: {
      console.log(data);
    }
  }
});
