import { Helmet } from "react-helmet-async";
import { matchPath, useLocation } from "react-router-dom";

type RouteSeo = {
  title: string;
  description: string;
  keywords?: string;
  noindex?: boolean;
  structuredData?: Record<string, unknown>;
};

const SITE_NAME = "Growithm";
const DEFAULT_DESCRIPTION =
  "Growithm은 GitHub 연동으로 알고리즘 풀이 기록을 수집하고, 대시보드와 스터디 기능으로 학습 흐름을 관리하는 서비스입니다.";
const DEFAULT_KEYWORDS =
  "알고리즘, 코딩테스트, GitHub, BaekjoonHub, 백준, 프로그래머스, 스터디, 문제 풀이";

const getOrigin = () => {
  if (typeof window === "undefined") {
    return "https://growithm.app";
  }

  return window.location.origin;
};

const getRouteSeo = (pathname: string): RouteSeo => {
  const routes: Array<{ path: string; seo: RouteSeo }> = [
    {
      path: "/",
      seo: {
        title: `${SITE_NAME} | GitHub 기반 알고리즘 학습 기록 서비스`,
        description:
          "GitHub와 BaekjoonHub를 연결해 알고리즘 풀이 기록을 자동 수집하고, 대시보드와 스터디 기능으로 학습을 관리하세요.",
        keywords: DEFAULT_KEYWORDS,
        structuredData: {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_NAME,
          url: getOrigin(),
          description: DEFAULT_DESCRIPTION,
        },
      },
    },
    {
      path: "/callback",
      seo: {
        title: `로그인 처리 중 | ${SITE_NAME}`,
        description: "GitHub 로그인 결과를 처리하고 있습니다.",
        noindex: true,
      },
    },
    {
      path: "/dashboard",
      seo: {
        title: `대시보드 | ${SITE_NAME}`,
        description: "풀이 현황, 티어 통계, 미작성 문제를 한눈에 확인하는 개인 대시보드입니다.",
        noindex: true,
      },
    },
    {
      path: "/dashboard/menual",
      seo: {
        title: `연동 가이드 | ${SITE_NAME}`,
        description: "GitHub 저장소와 BaekjoonHub를 연결하는 방법을 안내합니다.",
        noindex: true,
      },
    },
    {
      path: "/problem",
      seo: {
        title: `문제 목록 | ${SITE_NAME}`,
        description: "내가 기록한 알고리즘 문제를 조건별로 조회하고 관리할 수 있습니다.",
        noindex: true,
      },
    },
    {
      path: "/problem/:id",
      seo: {
        title: `문제 상세 | ${SITE_NAME}`,
        description: "문제 풀이 내용을 작성하거나 저장된 풀이를 확인할 수 있습니다.",
        noindex: true,
      },
    },
    {
      path: "/friend",
      seo: {
        title: `친구 관리 | ${SITE_NAME}`,
        description: "친구 목록과 요청 상태를 관리하는 화면입니다.",
        noindex: true,
      },
    },
    {
      path: "/study",
      seo: {
        title: `스터디 목록 | ${SITE_NAME}`,
        description: "참여 중인 스터디를 확인하고 새로운 스터디를 관리할 수 있습니다.",
        noindex: true,
      },
    },
    {
      path: "/study/:id/overview",
      seo: {
        title: `스터디 개요 | ${SITE_NAME}`,
        description: "스터디 진행 현황과 요약 정보를 확인하는 화면입니다.",
        noindex: true,
      },
    },
    {
      path: "/study/:id/problem",
      seo: {
        title: `스터디 문제 | ${SITE_NAME}`,
        description: "스터디 내 문제 현황과 풀이 상태를 관리하는 화면입니다.",
        noindex: true,
      },
    },
    {
      path: "/study/:id/member",
      seo: {
        title: `스터디 멤버 | ${SITE_NAME}`,
        description: "스터디 참여 멤버와 활동 정보를 확인하는 화면입니다.",
        noindex: true,
      },
    },
    {
      path: "/study/:id/owner",
      seo: {
        title: `스터디 관리 | ${SITE_NAME}`,
        description: "스터디장 전용 설정과 멤버 관리를 위한 화면입니다.",
        noindex: true,
      },
    },
  ];

  const matchedRoute = routes.find(({ path }) => matchPath({ path, end: true }, pathname));

  return (
    matchedRoute?.seo ?? {
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      keywords: DEFAULT_KEYWORDS,
      noindex: true,
    }
  );
};

const SeoManager = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const seo = getRouteSeo(pathname);
  const origin = getOrigin();
  const canonicalUrl = `${origin}${pathname}`;
  const ogImageUrl = `${origin}/logo.png`;
  const robots = seo.noindex ? "noindex, nofollow" : "index, follow";

  return (
    <Helmet>
      <html lang="ko" />
      <title>{seo.title}</title>
      <link rel="canonical" href={canonicalUrl} />
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords ?? DEFAULT_KEYWORDS} />
      <meta name="robots" content={robots} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={ogImageUrl} />
      {seo.structuredData && (
        <script type="application/ld+json">{JSON.stringify(seo.structuredData)}</script>
      )}
    </Helmet>
  );
};

export default SeoManager;
