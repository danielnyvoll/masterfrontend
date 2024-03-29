import React, { Suspense } from 'react';
import {
  Box,
  Text,
} from "@react-three/drei";
import {
  CuboidCollider,
  RigidBody,
} from "@react-three/rapier";
import { MeshPhysicalMaterial } from "three";
import { useDispatch, useSelector } from 'react-redux';
import { setGoal } from '../store';

const material = new MeshPhysicalMaterial();

const Goal = ({ position, rotation }) => {
  const dispatch = useDispatch();
  const intersecting = useSelector(state => state.goal.intersecting);
  return (
    <RigidBody position={position} rotation={rotation} type='fixed'>
      <Box
        scale={[11, 1, 1]}
        position={[0, 3, 0]}
        material={material}
        castShadow
      />
      <Box
        scale={[1, 6, 1]}
        position={[-5, 0, 0]}
        material={material}
        castShadow
      />
      <Box
        scale={[1, 6, 1]}
        position={[5, 0, 0]}
        material={material}
        castShadow
      />

      
      

      <Suspense fallback={null}>
        {intersecting && (
          <Text color="red" position={[0, 5, 0]} fontSize={2}>
            Goal
          </Text>
        )}
      </Suspense>

      {/**
       * We create a collider and set it to be a 'sensor'
       * This enables intersection events and enables
       * colliders to pass through it.
       */}
      <CuboidCollider
        position={[0, 0, -1]}
        args={[5, 3, 1]}
        sensor
        onIntersectionEnter={({other}) => {
          if(other.rigidBodyObject.name === "ball"){
            dispatch(setGoal(true));
          }  
        }}
        onIntersectionExit={() => {
          setTimeout(() => {
            dispatch(setGoal(false));
          }, 1000);
        }}
      />
    </RigidBody>
  );
};

export default Goal;
