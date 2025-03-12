import React, { useEffect, useState } from 'react';
import { SlUser, SlUserFemale } from 'react-icons/sl';
import Modal from '../../components/Modal';
import { Player } from './interface';
import { Gender } from '../Authentication/redux/interface';

export default function SinglePlayer(props: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  player: Player | null;
}) {
  const { isOpen, onClose, onSuccess, player } = props;
  const [formattedDate, setformattedDate] = useState<string>('');
  console.log(player);
  useEffect(() => {
    if (player) {
      const date = new Date(player!.dob);
      const formattedDate = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      setformattedDate(formattedDate);
    }
  }, [player]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {player && (
        <article className=" overflow-hidden bg-white dark:bg-theme-dark">
          <div className="flex gap-2 flex-col">
            {player.gender === Gender.MALE || player.gender === Gender.OTHER ? (
              <SlUser className="size-30 rounded-full object-cover" />
            ) : (
              <SlUserFemale className="text-8xl text-gray-400 object-cover" />
            )}
            <div>
              <h3 className="text-xl font-medium text-theme-light dark:text-white">
                <span>
                  {player.firstName} &nbsp;
                  {player.lastName}
                </span>
              </h3>

              <div className="flow-root text-sm text-theme-light dark:text-gray-400">
                <span>{player.nationality}</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pb-5 flex flex-col gap-2 w-full">
            <div className="flex justify-between p-1  items-center ">
              <div className="flex flex-col">
                <p className="font-medium text-gray-600 dark:text-black-2 text-sm">
                  Full name
                </p>
                <p className="text-xs  text-black-2 dark:text-white">
                  <span>
                    {player.firstName} &nbsp;
                    {player.lastName}
                  </span>
                </p>
              </div>
              <div className="w-20">
                <p className="font-medium text-gray-600 dark:text-black-2 text-sm">
                  Age
                </p>
                <p className="text-xs  text-black-2 dark:text-white">
                  {player.age}
                </p>
              </div>
            </div>
            <div className="flex justify-between  p-1 border-t border-gray-700">
              <div className="flex flex-col">
                <p className="font-medium text-gray-600 dark:text-black-2 text-sm">
                  DOB
                </p>
                <p className="text-xs  text-black-2 dark:text-white">
                  {formattedDate}
                </p>
              </div>
              <div className="w-20">
                <p className="font-medium text-gray-600 dark:text-black-2 text-sm">
                  Gender
                </p>
                <p className="text-xs  text-black-2 dark:text-white">
                  {player.gender}
                </p>
              </div>
            </div>
            <div className="flex justify-between  p-1 border-t border-gray-700">
              <div className="flex flex-col">
                <p className="font-medium text-gray-600 dark:text-black-2 text-sm">
                  Height
                </p>
                <p className="text-xs  text-black-2 dark:text-white">
                  {player.height}
                </p>
              </div>
              <div className="w-20">
                <p className="font-medium text-gray-600 dark:text-black-2 text-sm">
                  Weight
                </p>
                <p className="text-xs  text-black-2 dark:text-white">
                  {player.weight}
                </p>
              </div>
            </div>
            <div className="flex justify-between  p-1 border-t border-gray-700">
              <div className="flex flex-col">
                <p className="font-medium text-gray-600 dark:text-black-2 text-sm">
                  Foot
                </p>
                <p className="text-xs  text-black-2 dark:text-white">
                  {player.foot}
                </p>
              </div>
              <div className="w-20">
                <p className="font-medium text-gray-600 dark:text-black-2 text-sm">
                  Positions
                </p>
                <p className="text-xs  text-black-2 dark:text-white">
                  {player.positions.join(', ')}
                </p>
              </div>
            </div>
          </div>
        </article>
      )}
    </Modal>
  );
}
