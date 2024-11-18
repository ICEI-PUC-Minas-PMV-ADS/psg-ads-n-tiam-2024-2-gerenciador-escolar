﻿using Google.Cloud.Firestore;
using InstitutoCopacabanaAPI.Data;
using InstitutoCopacabanaAPI.Models;
using InstitutoCopacabanaAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace InstitutoCopacabanaAPI.Services.Classes
{
    public class ClassService : IClassService
    {
        public readonly FirestoreDb _firebaseClient;

        public ClassService(ContextDb contextDb)
        {
            _firebaseClient = contextDb.GetClient();
        }

        public async Task<ClassModel?> GetClassByName(string className) 
        {
            CollectionReference classesRef = _firebaseClient.Collection("classes");

            Query query = classesRef.WhereEqualTo("Name", className);
            QuerySnapshot querySnapshot = await query.GetSnapshotAsync();

            if (querySnapshot.Documents.Count > 0) 
            { 
                DocumentSnapshot document = querySnapshot.Documents[0];
                return document.ConvertTo<ClassModel>();
            }

            return null;
        }


        public async Task<ClassModel> CreateClass(ClassModel schoolClass)
        {
            DocumentReference docRef = _firebaseClient.Collection("classes").Document(schoolClass.Id);

            await docRef.SetAsync(schoolClass);

            return schoolClass;
        }

        public async Task<StudentModel> InsertStudent(string classId, StudentModel student)
        {
            DocumentReference docRef = _firebaseClient.Collection("classes").Document(classId);

            DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();
            if (snapshot.Exists && !snapshot.ContainsField("Students"))
            {
                Dictionary<string, object> initData = new Dictionary<string, object>
                {
                    { "Students", new List<StudentModel>() }
                };

                await docRef.UpdateAsync(initData);
            }

            Dictionary<string, object> updates = new Dictionary<string, object>
            {
                { "Students", FieldValue.ArrayUnion(student) }
            };

            await docRef.UpdateAsync(updates);

            return student;
        }
    }
}
