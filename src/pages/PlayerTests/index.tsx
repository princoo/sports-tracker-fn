import React, { useState } from 'react';
import { useGetActiveSessionsQuery } from '../Sessions/redux/api';
import { AvailableTests } from './AvailableTests';
import { Test } from '../tests/interface copy';
import SelectSite from './SelectSite';
import { set } from 'lodash';
import RecordPlayerTest from './RecordPlayerTest';
import { SessionTest } from './interface';

export default function PlayerTests() {
  const [selectedTest, setselectedTest] = useState<SessionTest | null>(null);
  const [selectedSite, setselectedSite] = useState<string | null>(null);
  const [onSelectSiteOpen, setonSelectSiteOpen] = useState<boolean>(false);
  const [onAddRecordOpen, setonAddRecordOpen] = useState<boolean>(false);
  function handleSelectedTest(test: SessionTest) {
    setselectedTest(test);
    setonSelectSiteOpen(true);
  }
  function handleSelectedSiteSuccess() {
    setonSelectSiteOpen(false);
    setonAddRecordOpen(true);
    console.log('first');
  }
  const {
    data: activeSession,
    isLoading: isSessionLoading,
    error: sessionError,
    refetch,
  } = useGetActiveSessionsQuery();

  return (
    <>
      {!onAddRecordOpen && (
        <div className=" max-w-4xl mx-auto">
          {!isSessionLoading ? (
            activeSession?.result.data ? (
              <div className="mx-4 lg:mx-4 xl:mx-0">
                <h2 className="text-4xl text-theme-light font-bold dark:text-white">
                  You have active session
                </h2>
                <span className="text-sm text-gray-400">
                  Due to{' '}
                  {new Date(activeSession.result.data.date).toLocaleDateString(
                    'en-US',
                    {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    },
                  )}
                </span>
                <div className="mt-6">
                  <AvailableTests
                    tests={activeSession.result.data.tests}
                    selectedTest={handleSelectedTest}
                  />
                </div>
              </div>
            ) : (
              <p> No Active Session</p>
            )
          ) : (
            <p>Loading...</p>
          )}
          <SelectSite
            isOpen={onSelectSiteOpen}
            onClose={() => setonSelectSiteOpen(false)}
            selecteSite={setselectedSite}
            onSuccess={handleSelectedSiteSuccess}
          />
        </div>
      )}
      {onAddRecordOpen && (
        <RecordPlayerTest
          isOpen={selectedTest !== null}
          onBack={() => {
            setselectedTest(null);
            setonAddRecordOpen(false);
          }}
          onSuccess={() => setselectedTest(null)}
          siteId={selectedSite}
          sessionTest={selectedTest}
        />
      )}
    </>
  );
}
