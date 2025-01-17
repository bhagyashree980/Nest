import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useSearchPage } from 'hooks/useSearchPage'
import React, { useState } from 'react'

import { IssueType } from 'types/issue'
import { getFilteredIcons } from 'utils/utility'
import FontAwesomeIconWrapper from 'wrappers/FontAwesomeIconWrapper'

import Card from 'components/Card'
import { Modal } from 'components/Modal'
import SearchPageLayout from 'components/SearchPageLayout'

const ContributePage = () => {
  const {
    items: issues,
    isLoaded,
    currentPage,
    totalPages,
    searchQuery,
    handleSearch,
    handlePageChange,
  } = useSearchPage<IssueType>({
    indexName: 'issues',
    pageTitle: 'OWASP Issues',
  })

  const [modalOpenIndex, setModalOpenIndex] = useState<number | null>(null)

  const renderContributeCard = (issue: IssueType, index: number) => {
    const params: string[] = ['idx_created_at', 'idx_comments_count']
    const filteredIcons = getFilteredIcons(issue, params)

    const SubmitButton = {
      label: 'Read More',
      icon: <FontAwesomeIconWrapper icon="fa-solid fa-wand-magic-sparkles" />,
      onclick: () => setModalOpenIndex(index),
    }

    const viewIssueButton = {
      label: 'View Issue',
      icon: <FontAwesomeIconWrapper icon={faGithub} />,
      url: issue.idx_url,
    }

    return (
      <React.Fragment key={issue.objectID || `issue-${index}`}>
        <Card
          key={issue.objectID || `issue-${index}`}
          title={issue.idx_title}
          url={issue.idx_url}
          projectName={issue.idx_project_name}
          projectLink={issue.idx_project_url}
          summary={issue.idx_summary}
          languages={issue.idx_repository_languages}
          topics={issue.idx_labels}
          icons={filteredIcons}
          button={SubmitButton}
        />
        <Modal
          key={`modal-${index}`}
          isOpen={modalOpenIndex === index}
          onClose={() => setModalOpenIndex(null)}
          title={issue.idx_title}
          summary={issue.idx_summary}
          hint={issue.idx_hint}
          button={viewIssueButton}
        ></Modal>
      </React.Fragment>
    )
  }

  return (
    <SearchPageLayout
      isLoaded={isLoaded}
      indexName="issues"
      totalPages={totalPages}
      currentPage={currentPage}
      searchQuery={searchQuery}
      onSearch={handleSearch}
      onPageChange={handlePageChange}
      searchPlaceholder="Search for OWASP issues..."
      empty="No issues found"
    >
      {issues && issues.map(renderContributeCard)}
    </SearchPageLayout>
  )
}

export default ContributePage
